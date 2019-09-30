//action
import sentenceSplitter from '../utils/sentence-segmenter'

export const storeInputText = (data = {}) => ({
  type: 'STORE_INPUT_TEXT',
  tags: data.tags,
  words: data.words,
  tagsAndWords: data.tagsAndWords,
  sentences: data.sentences
})

export const clearInputText = () => ({
  type: 'CLEAR_INPUT_TEXT'
})

export const toggleIsLoading = (bool) => ({
  type: 'TOGGLE_IS_LOADING',
  isLoading: bool
})


export const startPosProcessing = (src ={}) => {
  console.log(src)
  
  return async (dispatch) => {
    await dispatch(clearInputText()) //clear the redux store for the incoming data
    await dispatch(toggleIsLoading(true))

    const title = src.title || ''
    let text = src.text || ''

    //remove any whitespaces and newline chars
    text = text.replace(/(\r\n|\n|\r)/gm, "").trim(); 

    const sents = sentenceSplitter(text)
    let arrWords = [], arrTags = [], arrWordsAndTags = []

    for (let sent = 0; sent<sents.length; sent++) {
      const res = await fetch('http://localhost:3000/postag-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        body: JSON.stringify({text: sents[sent]})
      })
      const data = await res.json()
      data.tag.split(' ').forEach(wordAndTag => {
        arrWordsAndTags.push(wordAndTag)
        const bits = wordAndTag.split('_')
        arrWords.push(bits[0])
        arrTags.push(bits[1])
      })
    }

    const obj = {
      tagsAndWords: arrWordsAndTags,
      words: arrWords,
      tags: arrTags,
      sentences: sents,
      // isLoading: false
    }
    await dispatch(storeInputText(obj))
    await dispatch(toggleIsLoading(false)) //needs its own dispatch to trigger render to remove loader
    return obj
  }
}