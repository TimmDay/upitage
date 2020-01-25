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
