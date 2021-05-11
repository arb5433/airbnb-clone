from app.models import db, Booking
from random import randint


def seed_bookings():
  count = 100
  while count > 0:
    booking = Booking(userId=randint(1,199), postingId=randint(1,37), date='2021-05-'+str(randint(1,30)))
    db.session.add(booking)
    db.session.commit()
    count -= 1


def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()