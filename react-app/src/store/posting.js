// CONSTANTS
const LOAD_POSTINGS = 'postings/LOAD'
const ADD_POSTING = 'postings/ADD'
const REMOVE_POSTING = 'posting/REMOVE'
const LOAD_BUILDING_TYPES = 'postings/LOAD_BUILD'

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

const loadBuildingTypes = types => ({
  type: LOAD_BUILDING_TYPES,
  types
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

// helper function

const sortList = (list) => {
  return list.sort((postingA, postingB) => {
    return postingA.id - postingB.id;
  }).map((posting) => posting.id);
};

// reducer

const initialState = {postingsList : [], buildingTypes : []}

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
    case LOAD_BUILDING_TYPES:{
      return {
        ...state,
        buildingTypes: action.types
      }
    }
    default : {
      return state
    }
  }
}

export default postingReducer