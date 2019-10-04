import React from 'react';
import { connect } from 'react-redux';
import TextInput from './TextInput'

import { startPosProcessing } from '../actions/inputText'
import nyt_politics from './../utils/text_scraper/nyt_politics';

class TextScrapeBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {}
  }


  // full text (use request body)
  handleSubmitSourceForPOS = async (src) => {
    // TODO: instead make 2 args, src and topic
    // use these two to choose the scraper, fetch the result, populate POS
    //action: scrape
    const obj = { 
      title: src.title || '',
      text: src.text || ''
    }
    const result = await this.props.startPosProcessing(obj)
    console.log(result)
  }



  render () {
    return (

      <div className="content-container">
        <div className='text-scrape-bar'>

          < TextInput />

          <img 
            className="text-scrape-bar__icon" 
            src="/images/icons/logo-nyt-rnd.png" 
            onClick={() => this.handleSubmitSourceForPOS(nyt_politics)}
          />

          <img 
            className="text-scrape-bar__icon" 
            src="/images/icons/logo-nat-geo.png" 
            onClick={() => this.handleSubmitSourceForPOS(natgeo)}
          />

          <img 
            className="text-scrape-bar__icon" 
            src="/images/icons/logo-espn.png" 
            onClick={() => this.handleSubmitSourceForPOS(natgeo)}
          />

        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
   return {
   }
};

const mapDispatchToProps = (dispatch) => ({
  startPosProcessing: (src) => dispatch(startPosProcessing(src))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextScrapeBar);