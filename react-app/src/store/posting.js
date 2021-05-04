// CONSTANTS
const LOAD_POSTINGS = 'postings/LOAD'
const ADD_POSTING = 'postings/ADD'
const REMOVE_POSTING = 'posting/REMOVE'

const popularCities = ['New York, New York', 'Maui, Hawaii', 'Las Vegas, Nevada', 'New Orleans, Louisiana', 'Key West, Florida', 'San Diego, California', 'Savannah, Georgia', 'Charleston, South Carolina']
const tags = ['Secluded', 'Pets allowed', 'Full House', 'Unique']

// action creators

const loadPostings = (postings) => ({
  type: LOAD_POSTINGS,
  postings
})

const addPosrting = posting => ({
  type: ADD_POSTING,
  posting
});

const removePosting = id => ({
  type: REMOVE_POSTING,
  id
});

// thunks

export const getPostings = () => async dispatch => {
  const response = await fetch('/api/postings');
  if(response.ok){
    const data = await response.json();
    const postings = data.postings
    dispatch(loadPostings(postings));
  }
};

// helper function

const sortList = (list) => {
  return list.sort((postingA, postingB) => {
    return postingA.id - postingB.id;
  }).map((posting) => posting.id);
};

// reducer

const initialState = {postingsList : []}

const postingReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_POSTINGS:{
      const postings = {};
      action.postings.forEach(posting => {
        postings[posting.id] = posting;
      });
      return {
        ...state,
        ...postings,
        postingsList: sortList(action.postings),
      };
    }
    default : {
      return state
    }
  }
}

export default postingReducer