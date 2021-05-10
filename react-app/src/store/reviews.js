// constants
const LOAD_REVIEWS = 'reviews/LOAD'
const ADD_REVIEW = 'reviews/ADD'
const DELETE_REVIEW = 'reviews/DELETE'

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
})

const addReview = (review) => ({
  type : ADD_REVIEW,
  review
})

const deleteReview = (review) => ({
  type : DELETE_REVIEW,
  review
})

// thunks 

export const loadingReviews = (id) => async (dispatch) =>{
  const result = await fetch(`/api/reviews/postings/${id}`)
  const {reviews} = await result.json()
  dispatch(loadReviews(reviews))
}

export const addingReview = (formData) => async (dispatch) => {
  const result = await fetch (`/api/reviews/postings`, {
    method: 'POST',
    body: formData
  })
  const review = await result.json()
  dispatch(addReview(review))
}

export const deletingReview = (id) => async (dispatch) => {
  const result = await fetch (`/api/reviews/postings/${id}`, {
    method: 'DELETE'
  })
  const review = await result.json()
  dispatch(deleteReview(review))
}

// initial state
const initialState = {}

//reducer

const reviewsReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_REVIEWS: {
      const reviews = {}
      action.reviews.forEach(review => {
        reviews[review.id] = review
      })
      return {...reviews}
    }
    case ADD_REVIEW:{
      const newState = {
        ...state,
        [action.review.id] : action.review
      };
      return newState
    }
    case DELETE_REVIEW:{
      delete state[action.review.id]
      return {...state}
    }
    default:{
      return state
    }
  }
}

export default reviewsReducer;