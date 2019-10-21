export const mapLangToImage = (langCode) => {
  switch (langCode) {
    case 'EN':
      return '/images/flags-btn-round/flag-uk-button-round-500.png';
    case 'DE':
      return '/images/flags-btn-round/flag-germany-button-round-500.png';
    case 'ES':
      return '/images/flags-btn-round/flag-spain-button-round-500.png';
    default:
      return ''
  }
}

export const mapLangToISpeak = (langCode) => {
  switch (langCode) {
    case 'EN':
      return 'I speak...';
    case 'DE':
      return 'Ich spreche...';
    case 'ES':
      return 'Hablo...';
    default:
      return 'I speak...'
  }
}

export const mapLangToILearn = (langCode) => {
  switch (langCode) {
    case 'EN':
      return 'I want to learn...';
    case 'DE':
      return 'Ich will das lernen...';
    case 'ES':
      return 'Quiero aprender...';
    default:
      return 'I want to learn...'
  }
}