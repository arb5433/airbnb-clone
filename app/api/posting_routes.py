from app.models.postingReview import PostingReview
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Posting, Booking, BuildingType
import boto3
import botocore
import os
import uuid
import urllib.request
import json


# setting up the s3 with the bucket
s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
   aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
)

# helper functions for filenames
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

#helper function for upload
BUCKET_NAME = os.environ.get("AWS_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

#set up the router
posting_routes = Blueprint('postings', __name__)

# GET all available postings
@posting_routes.route('')
def all_postings():
  postings = Posting.query.all()
  return {'postings' : [posting.to_dict() for posting in postings]}

# GET all building types
@posting_routes.route('/buildings')
def all_building_types():
  types = BuildingType.query.all()
  return {'buildings' : [building.to_dict() for building in types]}
  

# GET all reviews for a posting
@posting_routes.route('/<int:pid>')
def all_post_reviews(pid):
  reviews = PostingReview.query.filter(PostingReview.postingId == pid)
  return {'reviews': [review.to_dict() for review in reviews]}

# POST a new posting 
@posting_routes.route('', methods=['POST'])
def post_posting():

  if "image" not in request.files:
    return {"errors": "image required"}, 400

  image = request.files['image']

  if not allowed_file(image.filename):
    return {"errors": "file type not permitted"}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)

  if "url" not in upload:
    # if the dictionary doesn't have a url key
    # it means that there was an error when we tried to upload
    # so we send back that error message
    return upload, 400

  url = upload["url"]
  city = request.form['city']
  address = request.form['address']
  building_type_id = request.form['buildingTypeId']
  num_guests = request.form['numGuests']
  num_beds = request.form['numBeds']
  num_bathrooms = request.form['numBathrooms']
  description = request.form['description']
  title = request.form['title']
  user_id = current_user.get_id()
  price = request.form['price']
  lat = request.form['lat']
  lng = request.form['lng']

  # set up this function with ASW

  posting = Posting(
    city=city, 
    address=address, 
    buildingTypeId=building_type_id, 
    numGuests=num_guests, 
    numBeds=num_beds, 
    numBathrooms=num_bathrooms,
    title=title,
    description=description,
    userId=user_id,
    price=price,
    mainImageUrl=url,
    latitude=lat,
    longitude=lng
  )

  db.session.add(posting)
  db.session.commit()

  return posting.to_dict()

# PUT update a posting
@posting_routes.route('/<int:pid>', methods=['PUT'])
def update_posting(pid):

  description = request.form['description']
  title = request.form['title']

  posting = Posting.query.get(pid)

  posting.description = description
  posting.title = title


  db.session.add(posting)
  db.session.commit()
  return posting.to_dict()


# DELETE a specific posting
@posting_routes.route('/<int:pid>', methods = ['DELETE'])
@login_required
def delete_posting(pid):
  print('********** INSIDE THE DELETE ROUTE ****************')
  posting = Posting.query.get(pid)
  # user_id = int(current_user.get_id())
  posting_user = posting.userId
  if current_user.id != posting_user:
    return {'message' : 'fail'}
  db.session.delete(posting)
  db.session.commit()
  return {'message' : 'success'}

@posting_routes.route('/latlng', methods=['POST'])
def render_json():
  address = request.form['address']
  api_key = os.environ.get('REACT_APP_GOOGLE_API_KEY')
  information = urllib.request.urlopen(f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}')
  data = json.loads(information.read().decode())
  return data