// constants 
const LOAD_TAGS = 'filter/LOAD_TAGS'
const ADD_FILTER = 'filter/ADD'
const REMOVE_FILTER = 'filter/REMOVE'
const CLEAR_FILTER = 'filter/CLEAR'

// action creators

export const addFilter = filter => ({
  type: ADD_FILTER,
  filter
})

export const removeFilter = id => ({
  type: REMOVE_FILTER,
  id
})

export const clearFilter = (filters) => ({
  type: CLEAR_FILTER, 
  filters
})

const loadTags = (tags) => ({
  type: LOAD_TAGS,
  tags
})

// thunks
export const loadingTags = () => async (dispatch) => {
  const result = await fetch('/api/postings/tags/types')
  const tags = await result.json()
  dispatch(loadTags(tags))
}

// reducer
const initialState = {filters: null, tagTypes : null}
const filterReducer = (state=initialState, action) => {
  switch(action.type){
    case LOAD_TAGS:{
      return {
        ...state,
        tagTypes : action.tags
      }
    }
    case ADD_FILTER:{
      const newFilters = {...state.filters}
      newFilters[action.tag.id] = action.tag
      return {
        ...state,
        filters : newFilters
      }
    }
    case REMOVE_FILTER:{
      const newFilters = {...state.filters}
      delete newFilters[state.id]
      return{
        ...state,
        filters : newFilters
      }
    }
    case CLEAR_FILTER:{
      return {
        ...state,
        filters : {}
      }
    }
    default: {
      return state
    }
  }
}

export default filterReducer;