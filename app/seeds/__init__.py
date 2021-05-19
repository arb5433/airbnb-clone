from app.seeds.tagType import seed_tag_types, undo_tag_types
from app.seeds.postingReview import seed_posting_reviews, undo_posting_reviews
from app.seeds.postings import seed_postings, undo_postings
from app.seeds.buildingType import seed_building_types, undo_building_types
from app.seeds.booking import seed_bookings, undo_bookings
from app.seeds.tags import seed_tags, undo_tags
from app.seeds.images import seed_images, undo_images
from flask.cli import AppGroup
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_building_types()
    seed_postings()
    seed_posting_reviews()
    seed_tag_types()
    seed_bookings()
    seed_images()
    seed_tags()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_building_types()
    undo_postings()
    undo_posting_reviews()
    undo_tag_types()
    undo_bookings()
    undo_images()
    undo_tags()
    # Add other undo functions here
