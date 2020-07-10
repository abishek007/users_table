import { createStore, applyMiddleware, compose } from "redux"
import { createLogger } from 'redux-logger'
import reducers from "./reducer/index"
import createSagaMiddleware from "redux-saga"
import sagas from "./sagas"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

middlewares.push(createLogger({
  level: "info",
  collapsed: true,
}))

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)))

sagaMiddleware.run(sagas)
export default store