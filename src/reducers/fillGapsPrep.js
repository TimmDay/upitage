const defaultState = { exercisesFGP: [], deepRerenderToggle: false }

export default (state = defaultState, action) => {
  switch (action.type) {

    case 'STORE_FGP_EX':
      return {
        ...state,
        exercisesFGP: action.exercisesFGP
      }

    case 'CLEAR_FTGPREP_DATA':
      return defaultState

    case 'UPDATE_CORRECT_ANSWER':
      const newObj = JSON.parse(JSON.stringify(state.exercisesFGP))
      newObj[action.exIndex].trackUserAnswers[action.ansIndex] = 1

      return {
        ...state,
        exercisesFGP: newObj,
        deepRerenderToggle: !state.deepRerenderToggle
      }
    default:
      return state
  }
};