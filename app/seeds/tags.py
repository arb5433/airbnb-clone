from app.models import db, Posting, TagType
from random import randint

def seed_tags():
  count = 35
  while count > 0:
    posting = Posting.query.get(count)
    tag1 = TagType.query.get(randint(1,9))
    tag2 = TagType.query.get(randint(1,9))
    posting.tagTypes.append(tag1)
    if tag1 != tag2:
      posting.tagTypes.append(tag2)
    db.session.commit()
    count -= 1

  

def undo_tags():
  db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
  db.session.commit()