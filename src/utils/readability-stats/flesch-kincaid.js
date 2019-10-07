const nlp = require('wink-nlp-utils');


const isVowel = (char) => {
  let isVowel = false
  switch (char) {
    case 'a':
    case 'A':
    case 'e':
    case 'E':
    case 'i':
    case 'I':
    case 'o':
    case 'O':
    case 'u':
    case 'U':
    case 'y':
    case 'Y':
      isVowel = true
      break;
    default:
      break;
  }
  return isVowel
}

const syllableCounter = (word) => {
  if ((word == null) || (word.length == 0)) return 0;
  word = word.toLowerCase()
  
  let syllableCnt = 0;
  let isPreviousCharVowel = false; //store the vowel-status of previous char so we can check for double vowels.
  let isCurrentCharVowel = false;

  word.split('').forEach((char,i) => {
    
    isCurrentCharVowel = isVowel(char)
    
    // Only increment syllableCnt if the previous char was NOT a vowel and this one is
    if (isCurrentCharVowel && !isPreviousCharVowel) syllableCnt++;

    isPreviousCharVowel = isCurrentCharVowel; //remember this for the next iteration
    
    // except: "io" dipthong check
    if (i > 1 && word[i-1] === 'i' && word[i] === 'o') {
      syllableCnt++;
      isPreviousCharVowel = false; //if the next is a vowel, we just counted it already
    }

    //except: "ia" dipthong check. as in EDITORIAL
    if (i > 1 && word[i-1] === 'i' && word[i] === 'a') {
      syllableCnt++;
      isPreviousCharVowel = false; //if the next is a vowel, we just counted it already
    }

    //except: "eo" dipthong check. as in PREORDAINED
    if (i > 1 && word[i-1] === 'e' && word[i] === 'o') {
      syllableCnt++;
      isPreviousCharVowel = false; //if the next is a vowel, we just counted it already
    }

  }) //end char loop

  //if word ends with e and that e is not preceded by a vowel
  if (word.endsWith('e') && !isVowel(word[word.length-2])) syllableCnt--

  //silent ending 'ed'?
  if (word.endsWith('ed')) syllableCnt-- // it is likely a silent e. dont count as syllable

  //if word ends with IOUS as in DELICIOUS (3 or 4?)
  // if (word.endsWith('ious') && !isVowel(word[word.length-2])) syllableCnt++

  //if word ends with IER as in ZAPIER
  if (word.endsWith('ier')) syllableCnt++

  if (syllableCnt == 0) syllableCnt = 1; // All non-empty words have at least 1 syllable

  // 2 char diphong check fixes
  if (word.includes("tion")) syllableCnt--; //fix for the "io" count, for "tion". just one syll
  if (word.includes("tial")) syllableCnt--; //fix for the "ia" count, for "tial". just one syll
  if (word.includes("cial")) syllableCnt--; //fix for the "ia" count, for "cial". just one syll
      
  if (word.includes('oi') && word.length > 3) syllableCnt++

  // hardcoded edge cases -- fix algo when pattern emerges
  if (word === 'invisible') return 4;
  if (word === 'statement') return 2; //not 3
  if (word === 'anyone') return 3; //not 2

  return syllableCnt
}

//export 
export const getFleschKincaidStats = (text) => {
  let totalSentences = 0
  let totalWords = 0
  let totalSyllables = 0
  
  // clean text. remove all carriage returns, new lines etc. an trim
  text = text.replace(/(\r\n|\n|\r)/gm, "").trim();
  console.log(text)

  const arrOfSents = nlp.string.sentences(text)
  console.log(arrOfSents)
  
  totalSentences = arrOfSents.length

  arrOfSents.forEach(sent => {
    const tokens = nlp.string.tokenize(sent, true)

    tokens.forEach(token => {
      if (token.tag === 'word') {
        totalWords++
        // console.log(token.value)
        // console.log(syllableCounter(token.value))
        totalSyllables += syllableCounter(token.value)
      }
    }) // end tokens
  }) // end sents
  
  console.log(`total words: ${totalWords}`)
  console.log(`total sentences: ${totalSentences}`)
  console.log(`total syllables: ${totalSyllables}`)
  
  let fleschReadingEase = 206.835 - 1.015*(totalWords/totalSentences) - 84.6*(totalSyllables/totalWords)
  let fleschKincaidGradeLevel = 0.39 * ( totalWords / totalSentences ) + 11.8* (totalSyllables / totalWords ) - 15.59

 

  fleschReadingEase = Math.round(fleschReadingEase*10) / 10
  fleschKincaidGradeLevel = Math.round(fleschKincaidGradeLevel*10) / 10
  
  console.log(fleschReadingEase)
  console.log(fleschKincaidGradeLevel)

  return {
    fleschReadingEase,
    fleschKincaidGradeLevel
  }

// flesch reading ease
//The higher the reading score, the easier a piece of text is to read.
// 206.835 - 1.015*(totalWords/totalSentences) - 84.6*(totalSyllables/totalWords)

// flesch-kincaid grade level
// the Flesch-Kincaid Grade Level is equivalent to the US grade level of education that the reader would require to be able to understand that piece of text.
// 0.39 * ( totalWords / totalSentences ) + (totalSyllables / totalWords ) - 15.59

// Sentences with lots of words are trickier to follow than shorter sentences.
// words that use fewer syllables are easier to read than words with more syllables
}

// const text = `GitHub is home to over 40 million developers working together to host and review code, manage projects, and build software together. 
// I'm looking for a fully accurate statement of an algorithm to count syllables in words. 
// What I'm finding when I research is inconsistent or what I know to generate incorrect results. 
// Does anyone have any suggestions of how to accomplish this? 
// Thanks.`
// // const text = `Tim is here !!! . , . , .`

// getFleschKincaidStats(text)