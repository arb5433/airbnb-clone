from app.models import db, PostingReview
from faker import Faker
from random import randint

fake = Faker()



def seed_posting_reviews():
  count = 200

  while count > 0:
    review = PostingReview(postingId=randint(1, 37), userId=randint(1,199), rating=randint(2,5), review=fake.text(max_nb_chars=400) )
    db.session.add(review)
    db.session.commit()
    count -= 1

  
def undo_posting_reviews():
    db.session.execute('TRUNCATE "postingReviews" RESTART IDENTITY CASCADE;')
    db.session.commit()