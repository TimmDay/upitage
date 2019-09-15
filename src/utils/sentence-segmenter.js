const nlp = require('wink-nlp-utils');
export default (para) => nlp.string.sentences(para);

// TESTS
// node src/utils/sentence-segmenter.js

// const dePara = 'Der ehemalige britische Premierminister David Cameron hält ein zweites Brexit-Referendum für möglich. In einem Interview mit der "Times" kritisierte der Ex-Premier das Vorgehen des aktuellen Regierungschefs Boris Johnson. Er unterstütze weder die von Johnson auferlegte Zwangspause des Parlaments noch den Fraktions-Rauswurf von 21 Tory-Abgeordneten, die gegen die Regierung gestimmt hatten. Auch ein EU-Austritt ohne Abkommen sei keine gute Idee, so Cameron. Cameron war nach dem Brexit-Votum der Briten im Jahr 2016 zurückgetreten.';
// const enPara = "POWERHOUSE Geelong forward Tom Hawkins is set to miss next week's preliminary final with Richmond after being hit with a one-match ban for his off-the-ball strike on West Coast defender Will Schofield on Friday night. On a night when the Cats avoided slumping to a straight-sets finals exit after finishing on top of the ladder, the Virgin Australia AFL All Australian full-forward was charged with striking Schofield in the third term with his right arm. Schofield stayed down for a little while and looked dazed as Hawkins came over to check on the veteran Eagle and seemingly offer an apology. Given there is no risk of longer sanction, the Cats seem likely to challenge the ban at the Tribunal, which will likely be held on Monday night."

// console.log(sentenceSplitter(dePara).length)
// console.log(nlp.string.sentences(dePara).length ); // expect 5
// console.log(nlp.string.sentences(enPara).length ); // expect 4
