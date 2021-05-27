// CONSTANTS
const LOAD_POSTINGS = 'postings/LOAD'
const ADD_POSTING = 'postings/ADD'
const REMOVE_POSTING = 'posting/REMOVE'
const LOAD_BUILDING_TYPES = 'postings/LOAD_BUILD'
const RELATIVE_POSTINGS = 'postings/RELATIVE_POSTINGS'
const UPDATE_POSTING ='postings/UPDATE'

// action creators

const loadPostings = (postings) => ({
  type: LOAD_POSTINGS,
  postings
})

export const addPosting = posting => ({
  type: ADD_POSTING,
  posting
});

export const removePosting = id => ({
  type: REMOVE_POSTING,
  id
});

const loadBuildingTypes = types => ({
  type: LOAD_BUILDING_TYPES,
  types
})

export const relativePostings = postings => ({
  type : RELATIVE_POSTINGS,
  postings
})

const updatePostings = posting => ({
  type: UPDATE_POSTING,
  posting
})

// thunks

export const getPostings = () => async dispatch => {
  const response = await fetch('/api/postings');
  if(response.ok){
    const data = await response.json();
    const postings = data.postings
    dispatch(loadPostings(postings));
  }
};

export const getBuildingTypes = () => async dispatch => {
  const response = await fetch('/api/postings/buildings');
  if(response.ok){
    const data = await response.json()
    const buildings = data.buildings
    dispatch(loadBuildingTypes(buildings))
  }
}

export const updatePosting = (formData, id) => async dispatch => {
  const response = await fetch(`/api/postings/${id}`, {
    method: 'PUT',
    body: formData
  })
  if(response.ok){
    const posting = await response.json()
    dispatch(updatePostings(posting))
  }
}
// helper function

const mapList = (list) => {
  return list.map((posting) => posting.id);
};

// reducer

const initialState = {postingsList : [], buildingTypes : [], shownPostings : [], searchedList : []}

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
        postingsList: mapList(action.postings),
      };
    }
    case LOAD_BUILDING_TYPES:{
      return {
        ...state,
        buildingTypes: action.types
      }
    }
    case RELATIVE_POSTINGS:{
      return {
        ...state,
        shownPostings : action.postings
      }
    }
    case ADD_POSTING:{
      if (!state[action.posting.id]) {
        const newState = {
        ...state,
        [action.posting.id]: action.posting
        };
        const postingsList = newState.postingsList.map(id => newState[id]);
        postingsList.push(action.posting);
        newState.postingsList = mapList(postingsList)
        return newState;
      }
      return state
    }
    case UPDATE_POSTING:{
      return {
        ...state,
        [action.posting.id] : action.posting
      }
    }
    case REMOVE_POSTING:{
      const newState = {...state}
      const postingsList = newState.postingsList.map(id => newState[id]);
      const newPostingList = postingsList.filter(posting => posting.id !== action.id);
      newState.postingsList = mapList(newPostingList)
      delete newState[action.id];
      return newState;
    }
    default : {
      return state
    }
  }
}

export default postingReducer