

export const storeInputText = (data = {}) => ({
  type: 'STORE_INPUT_TEXT',
  tags: data.tags,
  words: data.words,
  tagsAndWords: data.tagsAndWords,
  sentences: data.sentences
})