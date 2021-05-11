from app.models import BuildingType
from flask import Blueprint

building_routes = Blueprint('buildings', __name__)

@building_routes.route('/<int:id>')
def getBuilding(id):
  building = BuildingType.query.get(id)
  return building.to_dict()
