const defaultState = { 
  tags: [],
  words: [],
  tagsAndWords: [],
  sentences: []
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

    default:
      return state;
  }
};
