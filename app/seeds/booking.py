from app.models import db, Booking
from faker import Faker


fake = Faker()


def seed_bookings():
  booking = Booking(userId=1, postingId=1, date=(5,15,2021))
  db.session.add(booking)
  db.session.commit()


def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()