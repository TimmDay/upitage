const nlp = require('wink-nlp-utils');
export default (sentence) => nlp.string.tokenize(sentence);

// const s = "For finding Mary's lamb, check out http://wolves.org/ URL!";
// console.log( nlp.string.tokenize( s, true ) );
// --> 
// [
//   { value: 'For', tag: 'word' },
//   { value: 'finding', tag: 'word' },
//   { value: 'Mary', tag: 'word' },
//   { value: "'s", tag: 'word' },
//   { value: 'lamb', tag: 'word' },
//   { value: ',', tag: 'punctuation' },
//   { value: 'check', tag: 'word' },
//   { value: 'out', tag: 'word' },
//   { value: 'http://wolves.org/', tag: 'url' },
//   { value: 'URL', tag: 'word' },
//   { value: '!', tag: 'punctuation' }
// ]