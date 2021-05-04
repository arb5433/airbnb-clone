from .db import db


class UserReview(db.Model):
  __tablename__ = 'userReviews'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey(
    'users.id'), nullable=False)
  reviewerId = db.Column(db.Integer, db.ForeignKey(
    'users.id'), nullable=False)
  rating = db.Column(db.Integer, nullable=False)
  review = db.Column(db.String(500), nullable=False)

  def to_dict(self):
    return {
      'userId' : self.userId,
      'reviewerId' : self.reviewerId,
      'rating' : self.rating,
      'review' : self.review
    }