from app.models import db, PostingReview
from flask import Blueprint, request

review_routes = Blueprint('reviews', __name__)

#GET all reviews
@review_routes.route('/postings/<int:pid>')
def load_reviews(pid):
  reviews = PostingReview.query.filter(PostingReview.postingId == pid).all()
  return {'reviews' : [review.to_dict() for review in reviews]}

@review_routes.route('/postings', methods=['POST'])
def add_review():
  posting_id = request.form['postingId']
  user_id = request.form['userId']
  rating = request.form['rating']
  review = request.form['review']

  review = PostingReview(postingId=posting_id, userId=user_id, rating=rating, review=review)
  db.session.add(review)
  db.session.commit()
  return review.to_dict()

@review_routes.route('/postings/<int:rid>', methods=['DELETE'])
def delete_review(rid):
  review = PostingReview.query.get(rid)
  db.session.delete(review)
  db.session.commit()
  return review.to_dict()

@review_routes.route('/postings/<int:rid>', methods=['PUT'])
def edit_review(rid): 
  oldReview = PostingReview.query.get(rid)
  rating = request.form['rating']
  review = request.form['review']
  oldReview.rating = rating
  oldReview.review = review
  db.session.add(oldReview)
  db.session.commit()
  return oldReview.to_dict()