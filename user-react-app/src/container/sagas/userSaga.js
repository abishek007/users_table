import { takeLatest, put, call } from "redux-saga/effects"
import * as actions from "../actions"
import { getUserInfoApi, getUserInfoByIdApi } from "../api"

function* getUserInfoData() {
  const response = yield call(getUserInfoApi)
  if (response) {
    yield put(actions.getUserInfo.success(response))
  } else {
    yield put(actions.getUserInfo.failure(response))
  }
}

function* getUserByIdData(data) {
  const response = yield call(getUserInfoByIdApi, data.data)
  if (response) {
    yield put(actions.getUserById.success(response))
  } else {
    yield put(actions.getUserById.failure(response))
  }
}

export default function* main() {
  yield takeLatest(actions.getUserInfo.REQUEST, getUserInfoData)
  yield takeLatest(actions.getUserById.REQUEST, getUserByIdData)
}