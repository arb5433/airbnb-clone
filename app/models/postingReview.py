from .db import db


class PostingReview(db.Model):
  __tablename__ = 'postingReviews'

  id = db.Column(db.Integer, primary_key=True)
  postingId = db.Column(db.Integer, db.ForeignKey(
    'postings.id'), nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey(
    'users.id'), nullable=False)
  rating = db.Column(db.Integer, nullable=False)
  review = db.Column(db.String(500))

  def to_dict(self):
    return {
      'id' : self.id,
      'postingId': self.postingId,
      'userId' : self.userId,
      'rating' : self.rating,
      'review' : self.review
    }