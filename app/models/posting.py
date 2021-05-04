from .db import db


tags = db.Table(
  'tags',
  db.Column('postingId', db.Integer, db.ForeignKey('postings.id')),
  db.Column('tagId', db.Integer, db.ForeignKey('tagTypes.id')),
)


class Posting(db.Model):
  __tablename__ = 'postings'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  city = db.Column(db.String(100), nullable=False)
  address = db.Column(db.String(250), nullable=False)
  buildingTypeId = db.Column(db.Integer, db.ForeignKey(
    'buildingTypes.id'), nullable=False)
  numGuests = db.Column(db.Integer, nullable=False)
  numBeds = db.Column(db.Integer, nullable=False)
  numBathrooms = db.Column(db.Integer, nullable=False)
  mainImageUrl = db.Column(db.String(250))
  description = db.Column(db.String(500), nullable=False)
  title = db.Column(db.String(250), nullable=False)
  price = db.Column(db.Integer, nullable=False)
  bookings = db.relationship('Booking', backref='postings')
  images = db.relationship('Image', backref='postings')
  reviews = db.relationship('PostingReview', backref='postings')
  tags = db.relationship(
    'TagType',
    secondary=tags,
    primaryjoin=id == tags.c.postingId,
    secondaryjoin=id == tags.c.tagId,
    backref=db.backref('postings', lazy='joined'),
    lazy='joined',
  )

  def to_dict(self):
    return {
      'id': self.id,
      'userId' : self.userId,
      'city': self.city,
      'address': self.address,
      'buildingType': self.buildingTypeId,
      'numGuests' : self.numGuests,
      'numBeds' : self.numBeds,
      'numBathrooms' : self.numBathrooms,
      'mainImageUrl' : self.mainImageUrl,
      'description' : self.description,
      'title' : self.title,
      'price': self.price,
      'bookings' : [booking.to_dict() for booking in self.bookings],
      'images' : [image.to_dict() for image in self.images],
      'reviews' : [review.to_dict() for review in self.reviews],
      'tags' : [tag.to_dict() for tag in self.tags]
    }
