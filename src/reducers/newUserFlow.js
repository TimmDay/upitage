const defaultState = { 
  langInstruction: '', 
  langTarget: ''
};
export default (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_LANG_INSTRUCTION':
      return {
        ...state,
        langInstruction: action.lang
      };
    case 'SELECT_LANG_TARGET':
      return {
        ...state,
        langTarget: action.lang
      };
    default:
      return state;
  }
};
