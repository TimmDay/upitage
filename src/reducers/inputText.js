const defaultState = { 
  tags: [],
  words: [],
  tagsAndWords: [],
  sentences: [],
  wordsBySent: [],
  tagsBySent: [],
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
        sentences: action.sentences,
        tagsBySent: action.tagsBySent,
        wordsBySent: action.wordsBySent
      };

    case 'CLEAR_INPUT_TEXT':
      return defaultState;

    case 'TOGGLE_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      }

    case 'STORE_FLESCH_KINCAID':
      return {
        ...state,
        fleschReadingEase: action.fleschReadingEase,
        fleschKincaidGradeLevel: action.fleschKincaidGradeLevel
      }

    default:
      return state;
  }
};
