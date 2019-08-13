const posTagEnWord = async (sourceText, projectId='langevant', source='en', target='de') => { 
  const {Translate} = require('@google-cloud/translate');

  try {
    const translate = new Translate({projectId});

    // Translates some text
    const [translation] = await translate.translate(sourceText, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);

  } catch (evt) {
    console.log(evt); 
  }
}

module.exports = posTagEnWord