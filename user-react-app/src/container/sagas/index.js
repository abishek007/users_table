import { fork } from "redux-saga/effects"
import userSaga from "./userSaga"


export default function* main() {
  yield fork(userSaga)
}