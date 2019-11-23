const defaultState = { exercisesFGP: [] }

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'STORE_FGP_EX':
      return {
        ...state,
        exercisesFGP: action.exercisesFGP
      }
    case 'CLEAR_FTGPREP_DATA':
      return defaultState
    default:
      return state
  }
};