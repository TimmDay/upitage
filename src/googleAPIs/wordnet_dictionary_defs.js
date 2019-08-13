

// Imports the Google Cloud client library
async function main(
  projectId = 'langevant' // Your GCP Project Id
) {
  const {Translate} = require('@google-cloud/translate');

  // Instantiates a client
  const translate = new Translate({projectId});

  // The text to translate
  const text = 'Here is a great big hungry dog';

  // The target language
  const target = 'de';

  // Translates some text into Russian
  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
}

main()




// // const wordnet = require('en-wordnet')
// // const Dictionary = require('en-dictionary/dist/dictionary/index').Dictionary

// // const start = async () => {
// //   try {
// //     const dictionary = new Dictionary(wordnet['3.0'])
// //     await dictionary.init()
// //     // const result = dictionary.searchFor('yet')
// //     // let result = dict.searchFor('preposterous')
// //     let result = dict.searchFor('cat')
// //     console.log(result);
// //   } catch (e) {
// //     console.log(e);
// //   }
// // }
// // console.log('here comes th thing');
// // // console.log(Dictionary);
// // // console.log(new Dictionary(wordnet['3.0']));
// // console.log('go START');
// // start()

// const request = require('request');

// const doGet = (sourceText = '', sourceLang = 'auto', targetLang = 'de') => {
//   const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
//   +sourceLang
//   +"&tl="+targetLang
//   +"&dt=t&q="+encodeURIComponent(sourceText);

//   request({ url, json: true }, (error, response) => {
//     if (error) {
//       callback('unable to connect to location services', undefined)

//     } else {
//       console.log(response);
//     }
    
//     // if (body.features.length === 0) {
//     //   callback('unable to find location for this search', undefined)

//     // } else {
//     //   callback(undefined, {
//     //     // placeName: body.features[0].place_name,
//     //     // lat: body.features[0].center[1],
//     //     // lon: body.features[0].center[0]
//     //   })
    
//   })
// };


// //   var result = JSON.parse(UrlFetchApp.fetch(url).getContentText());
  
// //   translatedText = result[0][0][0];
  
// //   var json = {
// //     'sourceText' : sourceText,
// //     'translatedText' : translatedText
// //   };
  
// //   // set JSONP callback
// //   var callback = 'callback';
// //   if(e.parameter.callback){
// //     callback = e.parameter.callback
// //   }
  
// //   // return JSONP
// //   return ContentService
// //            .createTextOutput(callback + '(' + JSON.stringify(json) + ')')
// //            .setMimeType(ContentService.MimeType.JAVASCRIPT);
// // }

// const query = {
//   q: 'here is a dog',
//   source: 'en',
//   target: 'de'
// }
// doGet('here is a dog', 'en','des')