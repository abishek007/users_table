import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "./actions"
import get from "lodash/get"

function mapStateToProps(state) {
  const { userData, selectedUserData } = state.userReducer
  const userDataArr = get(userData, "data", [])
  const selectedUserObj = get(selectedUserData, "data", {})

  return {
    userDataArr,
    selectedUserObj,
  }
}
  
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...actions,
    getUserInfoRequest: actions.getUserInfo.request,
    updateUserDetailsRequest: actions.updateUserDetails.request,
    getUserByIdRequest: actions.getUserById.request,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
