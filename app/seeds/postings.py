from app.models import buildingType, db, Posting


def seed_postings():
  post = Posting(
    city='State College',
    address = '814 Whitehall Road, State College, PA, 16801',
    buildingTypeId = 2,
    numGuests = 3,
    numBeds = 2,
    numBathrooms = 1,
    mainImageUrl = 'https://www.pexels.com/photo/white-and-brown-house-1974596/',
    description = 'This is a test property to set up the frontend and css',
    title = 'Test Posting',
    price = 132
  )
  db.session.add(post)
  db.session.commit()

def undo_postings():
    db.session.execute('TRUNCATE postings RESTART IDENTITY CASCADE;')
    db.session.commit()