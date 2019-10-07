const defaultState = { 
  exercisesFGP: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    
    case 'STORE_FGP_EX':
        return {
          ...state,
          exercisesFGP: action.exercisesFGP
        }
  
      default:
        return state;
    }
  };