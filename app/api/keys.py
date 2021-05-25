from flask import Blueprint
import os

key_routes = Blueprint('keys', __name__)

@key_routes.route('/googlemap')
def googleapi():
  api_key = os.environ.get('REACT_APP_GOOGLE_API')
  return {'apiKey': api_key}