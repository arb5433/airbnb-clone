// constants 
const LOAD_BOOKINGS = 'bookings/LOAD'
const REMOVE_BOOKING = 'bookings/REMOVE'
const ADD_BOOKING = 'bookings/ADD'

// action creators

const loadBookings = (bookings) => ({
  type: LOAD_BOOKINGS,
  bookings
})

const removeBooking = (booking) => ({
  type: REMOVE_BOOKING,
  booking
})

const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking
})

// thunks

export const loadingBookings = (id) => async (dispatch) => {
  const result = await fetch(`/api/bookings/${id}`)
  const {bookings} = await result.json()
  dispatch(loadBookings(bookings))
}

export const removingBooking = (id) => async (dispatch) => {
  const result = await fetch(`/api/bookings/${id}`, {
    method : 'DELETE'
  })
  const booking = await result.json()
  dispatch(removeBooking(booking))
}

export const addingBooking = (formData) => async (dispatch) => {
  const result = await fetch(`/api/bookings`, {
    method: 'POST',
    body : formData
  })
  const newBooking = await result.json()
  dispatch(addBooking(newBooking))
}

// initial state
const initialState = null
const bookingReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_BOOKINGS:{
      const allBookings = {}
      action.bookings.forEach(booking => {
        allBookings[booking.id] = booking
      })
      return {
        ...allBookings
      }
    }
    case ADD_BOOKING: {
      if (!state[action.booking.id]){
        const newState = {
          ...state,
          [action.booking.id] : action.booking
        };
        return newState
      }
    }
    case REMOVE_BOOKING: {
      delete state[action.booking.id]
      return {...state}
    }
    default:{
      return state
    }
  }
}

export default bookingReducer;