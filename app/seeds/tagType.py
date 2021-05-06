from app.models import TagType, db


def seed_tag_types():
  types = ['Pet Friendly', 'Smoke Free', 'Unique', 'Secluded', 'Private', 'Pool', 'Beach', 'Downtown', 'Entire House']

  results = []

  for type in types:
    tag = TagType(type=type)
    db.session.add(tag)
    db.session.commit()


def undo_tag_types():
    db.session.execute('TRUNCATE "tagTypes" RESTART IDENTITY CASCADE;')
    db.session.commit()