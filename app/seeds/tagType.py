from app.models import TagType, db


def seed_tag_types():
  types = ['Pet Friendly', 'Smoke Free', 'Unique', 'Secluded', 'Private', 'Pool', 'Beach', 'Downtown']

  results = []

  for type in types:
    results.append(TagType(type=type))

  for result in results:
    db.session.add(result)
    db.session.commit()


def undo_tag_types():
    db.session.execute('TRUNCATE tagTypes RESTART IDENTITY CASCADE;')
    db.session.commit()