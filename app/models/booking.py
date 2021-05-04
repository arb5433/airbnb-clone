from .db import db


class Booking(db.Model):
  __tablename__ = 'bookings'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey(
    'users.id'), nullable=False)
  postingId = db.Column(db.Integer, db.ForeignKey(
    'postings.id'), nullable=False)
  date = db.Column(db.Date, nullable=False)

  def to_dict(self):
    return {
      'userId' : self.userId,
      'postingId' : self.postingId,
      'date' : self.date,
    }