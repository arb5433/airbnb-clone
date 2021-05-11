// constants
const MAP_BOUNDS = 'map/MAP_BOUNDS';

// action creators
export const setBounds = bounds => ({
  type: MAP_BOUNDS,
  bounds
})

// reducer
const initialState = {bounds: null}
const mapReducer = (state = initialState, action) => {
  switch(action.type){
    case MAP_BOUNDS:{
      return {
        ...state,
        bounds : action.bounds
      }
    }
    default : {
      return state
    }
  }
}

export default mapReducer;
