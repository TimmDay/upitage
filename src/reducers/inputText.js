const defaultState = { 
  tags: [],
  words: [],
  tagsAndWords: [],
  sentences: [],
  isLoading: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    
    case 'STORE_INPUT_TEXT':
      return {
        ...state,
        tags: action.tags,
        words: action.words,
        tagsAndWords: action.tagsAndWords,
        sentences: action.sentences
      };

    case 'CLEAR_INPUT_TEXT':
      return defaultState;

    case 'TOGGLE_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      }

    default:
      return state;
  }
};
