
// this uses the Penn Treebank tagset
// ref: https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html
const posTagToDescEn = tag => {

  // edge case: tag = IN/that
  // only for updated set, (not what I'm using, yet)
  // if (tag.indexOf('/') > -1) { tag = tag.split('/').join('') }

  const enTags = {
    CC: 'coordinating conjunction',
    CD: 'cardinal number',
    CDZ: 'possesive pronoun',
    DT: 'determiner',
    EX: 'existential there',
    FW: 'foreign word',
    IN: 'preposition, subordinating conjunction',
    // INthat: 'that as subordinator',
    JJ: 'adjective',
    JJR: 'adjective, comparative',
    JJS: 'adjective, superlative',
    LS: 'list marker',
    MD: 'modal',
    NN: 'noun, singular or mass',
    NNS: 'noun plural',
    NNP: 'proper noun, singular',
    NNPS: 'proper noun, plural',
    // NNSZ: 'possesive noun plural',
    // NNZ: 'possessive noun, singular or mass',
    // NP: 'proper noun, singular',
    // NPS: 'proper noun, plural',
    // NPSZ: 'possessive proper noun, plural',
    // NPZ: 'possessive noun, singular',
    PDT: 'predeterminer',
    POS: 'possessive ending',
    PRP: 'personal pronoun',
    PRP$: 'possessive pronoun',
    RB: 'adverb',
    RBR: 'adverb, comparative',
    RBS: 'adverb, superlative',
    RP: 'particle',
    SYM: 'symbol',
    TO: 'to',
    UH: 'interjection',
    VB: 'verb, base form',
    VBD: 'verb, past tense',
    VBG: 'verb, gerund or present participle',
    VBN: 'verb, past participle',
    VBP: 'verb, non-3rd person singular present',
    VBZ: 'verb 3rd person singular present',
    WDT: 'Wh-determiner',
    WP: 'Wh-pronoun',
    WP$: 'possessive wh-pronoun',
    WRB: 'wh-adverb'
  }

  if (enTages.tag) {
    return enTags.tag
  }
  return -1;
};

module.exports = posTagToDescEn