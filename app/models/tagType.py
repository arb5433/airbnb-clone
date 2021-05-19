from .db import db
from app.models.posting import tags


class TagType(db.Model):
  __tablename__  = 'tagTypes'

  id = db.Column(db.Integer, primary_key=True)
  type = db.Column(db.String(100), nullable=False)
  postings = db.relationship('Posting', secondary=tags, back_populates='tagTypes')

  def to_dict(self):
    return {
      'id' : self.id,
      'type' : self.type
    }