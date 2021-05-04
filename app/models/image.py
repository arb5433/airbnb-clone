from .db import db


class Image(db.Model):
  __tablename__ = 'images'

  id = db.Column(db.Integer, primary_key=True)
  postingId = db.Column(db.Integer, db.ForeignKey(
    'postings.id'), nullable=False)
  imageUrl = db.Column(db.String(250), nullable=False)

  def to_dict(self):
    return {
      'postingId' : self.postingId,
      'imageUrl' : self.imageUrl
    }