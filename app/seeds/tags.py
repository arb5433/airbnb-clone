from app.models import db, Tag
from random import randint

def seed_tags():
  count = 30
  while count > 0:
    tag = Tag(postingId=randint(1,36), tagTypeId=randint(1,9))
    db.session.add(tag)
    db.session.commit()
  

def undo_tags():
  db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
  db.session.commit()