export const createActionCreator = action => arg => ({
  type: action,
  data: arg,
})

export const createSignalAction = function createSignalAction(reducerName, base) {
  return ["REQUEST", "SUCCESS", "FAILURE", "PENDING", "CLEAR"].reduce((prev, curr) => {
    const newPrev = prev
    newPrev[curr] = `SIGNAL/${reducerName}/${base}/${curr}`
    newPrev[curr.toLowerCase()] = createActionCreator(prev[curr])
    return newPrev
  }, {})
}

export const initialState = {
  isFetching: false,
  error: "",
  data: null,
  finished: false,
}

export function reducer(state = initialState, action, actionSignal) {
  switch (action.type) {
    case actionSignal.REQUEST:
      return { ...state, isFetching: true, finished: false, error: null }
    case actionSignal.SUCCESS:
      return { ...state, isFetching: false, data: action.data, finished: true, error: null }
    case actionSignal.FAILURE:
      return { ...state, isFetching: false, error: action.error || action.data, finished: true, data: null }
    case actionSignal.CLEAR:
      return initialState
    default:
      return state
  }
}