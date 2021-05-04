from app.models import db, BuildingType


def seed_building_types():
  types = ['Apartment', 'House', 'Secondary unit', 'Unique space', 'Bed and breakfast', 'Boutique hotel']

  results = []

  for type in types: 
    results.append(BuildingType(type=type))

  for result in results:
    db.session.add(result)
    db.session.commit()


def undo_building_types():
    db.session.execute('TRUNCATE buildingTypes RESTART IDENTITY CASCADE;')
    db.session.commit()