from app.models import db, PostingReview


def seed_posting_reviews():
  postingReview = PostingReview(postingId=1, userId=2, rating=4, review='This is a test review for frontend and css')
  db.session.add(postingReview)
  db.session.commit()

  
def undo_posting_reviews():
    db.session.execute('TRUNCATE postingReviews RESTART IDENTITY CASCADE;')
    db.session.commit()