export const selectLangInstruction = (lang = '') => {
  return ({
    type: 'SELECT_LANG_INSTRUCTION',
    lang
  })
}

export const selectLangTarget = (lang = '') => {
  return ({
    type: 'SELECT_LANG_TARGET',
    lang
  })
}