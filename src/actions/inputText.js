//action
import sentenceSplitter from '../utils/sentence-segmenter'
import { getFleschKincaidStats } from '../utils/readability-stats/flesch-kincaid'
import { startGenFGP } from '../actions/fillGapsPrep'


export const storeInputText = (data = {}) => ({
  type: 'STORE_INPUT_TEXT',
  tags: data.tags,
  words: data.words,
  tagsAndWords: data.tagsAndWords,
  sentences: data.sentences,
  wordsBySent: data.wordsBySent,
  tagsBySent: data.tagsBySent
})

export const clearInputText = () => ({ type: 'CLEAR_INPUT_TEXT' })

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
    let arrWordsBySent = [], arrTagsBySent = [] //arr of arrs

    for (let sent = 0; sent<sents.length; sent++) {
      const res = await fetch('http://localhost:3000/postag-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        body: JSON.stringify({text: sents[sent]})
      })

      const data = await res.json()
      let tempArrWordsThisSent = [], tempArrTagsThisSent = []
      data.tag.split(' ').forEach(wordAndTag => {
        arrWordsAndTags.push(wordAndTag)
        const bits = wordAndTag.split('_')
        arrWords.push(bits[0])
        arrTags.push(bits[1])
        tempArrWordsThisSent.push(bits[0])
        tempArrTagsThisSent.push(bits[1])
      })
      arrWordsBySent.push(tempArrWordsThisSent)
      arrTagsBySent.push(tempArrTagsThisSent)
    }

    const obj = {
      tagsAndWords: arrWordsAndTags,
      words: arrWords,
      tags: arrTags,
      sentences: sents,
      wordsBySent: arrWordsBySent,
      tagsBySent: arrTagsBySent
      // isLoading: false
    }
    await dispatch(storeInputText(obj))
    await dispatch(toggleIsLoading(false)) //needs its own dispatch to trigger render to remove loader
    
    //generate data for FTG Prep ex. so it is ready before user clicks btn
    await dispatch(startGenFGP())
    
    return obj
  }
}


export const startFleschKincaid = (text='') => {
  return async (dispatch) => {
    console.log('start FK')
    const obj = getFleschKincaidStats(text)
    console.log(obj)
    
    dispatch(storeFleschKincaid(obj))
  }
}

const storeFleschKincaid = (obj) => ({
  type: 'STORE_FLESCH_KINCAID',
  fleschReadingEase: obj.fleschReadingEase,
  fleschKincaidGradeLevel: obj.fleschKincaidGradeLevel
})