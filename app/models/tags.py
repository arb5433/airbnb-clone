from .db import db


class Tag(db.Model):
  __tablename__  = 'tags'

  id = db.Column(db.Integer, primary_key=True)
  postingId = db.Column(db.Integer, db.ForeignKey('postings.id'), nullable=False)
  tagTypeId = db.Column(db.Integer, db.ForeignKey('tagTypes.id'), nullable=False)

  def to_dict(self):
    return {
      'postingId' : self.postingId,
      'tagTypeId' : self.tagTypeId
    }