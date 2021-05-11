// constants 
const GET_USER_INFO = 'users/GET_USER_INFO'
const GET_BUILDING_INFO = 'buildingType/GET_BUILDING_INFO'

// action creators
const getUser = (user) => ({
  type : GET_USER_INFO,
  user
})

const getBuilding = (building) => ({
  type : GET_BUILDING_INFO,
  building
})

// thunks

export const getUserInfo = (id) => async (dispatch) => {
  const results = await fetch(`/api/users/${id}`)
  const user = await results.json()
  dispatch(getUser(user))
}

export const getBuildingInfo = (id) => async (dispatch) => {
  const results = await fetch(`/api/buildings/${id}`)
  const building = await results.json()
  dispatch(getBuilding(building))
}

// initial state
const initialState = {user:{}, building:{}}

// reducer

const infoReducer = (state = initialState, action) => {
  switch(action.type){
    case GET_USER_INFO:{
      return {
        ...state,
        user : action.user
      }
    }
    case GET_BUILDING_INFO:{
      return {
        ...state,
        building : action.building
      }
    }
    default : {
      return state
    }
  }
}

export default infoReducer;