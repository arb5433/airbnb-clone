from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  profilePic = db.Column(db.String(255))
  hashed_password = db.Column(db.String(255), nullable = False)
  bookings = db.relationship('Booking', backref='users', cascade='all, delete')
  postings = db.relationship('Posting', backref='users', cascade='all, delete')
  # reviews = db.relationship('UserReview', backref='users', cascade='all, delete')



  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      'profilePic' : self.profilePic,
      'bookings' : [booking.to_dict() for booking in self.bookings],
      'postings' : [posting.to_dict() for posting in self.postings],
      # 'reviews' : [review.to_dict() for review in self.reviews]
    }
