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

    case 'UPDATE_CORRECT_ANSWER':
      return {
        ...state,
        exercisesFGP: state.exercisesFGP.map(
          (ex, i) => i === action.exIndex ? { 
            ...ex, 
            trackUserAnswers: [1,2,3] //want the existing, with rel 0 => 1
            //ex.trackUserAnswers.map((ans,i) => i === action.ansIndex ? 1 : ans)
            // the existing one with rel val updated to 1
          } : { ...ex }
        )
      }
    default:
      return state
  }
};