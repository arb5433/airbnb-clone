from app.models import db, Booking
from flask import Blueprint, request

booking_routes = Blueprint('bookings', __name__)

# GET all booking for an associated id
@booking_routes.route('/<int:pid>')
def load_bookings(pid):
  bookings = Booking.query.filter(Booking.postingId == pid).all()
  return {'bookings' : [booking.to_dict() for booking in bookings]}

@booking_routes.route('/<int:bid>', methods=['DELETE'])
def delete_booking(bid):
  booking = Booking.query.get(bid)
  db.session.delete(booking)
  db.session.commit()
  return booking.to_dict()

@booking_routes.route('', methods = ['POST'])
def add_booking():
  user_id = request.form['userId']
  posting_id = request.form['postingId']
  date = request.form['date']
  booking = Booking(userId=user_id, postingId=posting_id, date=date)
  db.session.add(booking)
  db.session.commit()
  return booking.to_dict()