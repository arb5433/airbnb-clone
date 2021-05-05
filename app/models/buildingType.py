from .db import db


class BuildingType(db.Model):
  __tablename__ = 'buildingTypes'

  id = db.Column(db.Integer, primary_key=True)
  type = db.Column(db.String(100), nullable=False)
  postings = db.relationship('Posting', backref='buildingTypes',cascade="all, delete", passive_deletes=True)

  def to_dict(self):
    return {
      'type': self.type
    }
