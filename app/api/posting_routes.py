from app.models.postingReview import PostingReview
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Posting, Booking


posting_routes = Blueprint('postings', __name__)

# GET all available postings
@posting_routes.route('')
def all_postings():
  postings = Posting.query.all()
  return [posting.to_dict() for posting in postings]
  

# GET all reviews for a posting
@posting_routes.route('/<int:pid>')
def all_post_reviews(pid):
  reviews = PostingReview.query.filter(PostingReview.postingId == pid)
  return [review.to_dict() for review in reviews]

# POST a new posting 
@posting_routes.route('', methods=['POST'])
def post_posting():

  main_image = request.files['mainImage']
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

  # set up this function with ASW

  posting = Posting(city=city, 
  address=address, 
  buildingTypeId=building_type_id, 
  numGuests=num_guests, 
  numBeds=num_beds, 
  numBathrooms=num_bathrooms,
  title=title,
  description=description,
  userId=user_id,
  price=price,
  mainImageUrl='https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg')

  db.session.add(posting)
  db.session.commit()

  return posting.to_dict()

# PUT update a posting
@posting_routes.route('/<int:pid>', methods=['PUT'])
def update_posting(pid):
  city = request.form['city']
  address = request.form['address']
  building_type_id = request.form['buildingTypeId']
  num_guests = request.form['numGuests']
  num_beds = request.form['numBeds']
  num_bathrooms = request.form['numBathrooms']
  description = request.form['description']
  title = request.form['title']
  price = request.form['price']

  posting = Posting.query.get(pid)
  posting.address = address
  posting.city = city
  posting.buildingTypeId = building_type_id,
  posting.numGuests = num_guests
  posting.numBeds = num_beds
  posting.numBathrooms = num_bathrooms
  posting.description = description
  posting.title = title
  posting.price = price

  db.session.add(posting)
  db.session.commit()
  return posting.to_dict()


# DELETE a specific posting
@posting_routes.route('/<int:pid>', methods = ['DELETE'])
def delete_posting(pid):
  posting = Posting.query.get(pid)
  user_id = int(current_user.get_id())
  posting_user = posting.userId
  if user_id == posting_user:
    db.session.delete(posting)
    db.session.commit()
    return {'message': 'deleted'}

