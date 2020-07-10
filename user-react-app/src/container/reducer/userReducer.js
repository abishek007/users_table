import * as actions from "../actions"
import { initialState, reducer } from "../utils"

const intialStateObj = {
  userData: { ...initialState },
  selectedUserData: { ...initialState },
}

const userReducer = (state = intialStateObj, action) => {
  switch(action.type) {
    case actions.getUserInfo.REQUEST:
    case actions.getUserInfo.SUCCESS:
    case actions.getUserInfo.FAILURE:
      return {
        ...state,
        userData: {
          ...reducer(state.userData, action, actions.getUserInfo),
        },
      }
    case actions.getUserById.REQUEST:
    case actions.getUserById.SUCCESS:
    case actions.getUserById.FAILURE:
      return {
        ...state,
        selectedUserData: {
          ...reducer(state.selectedUserData, action, actions.getUserById),
        },
      }
    default:
      return state
  }
}

export default userReducer