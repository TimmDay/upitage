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
    const obj = { 
      title: src.title || '',
      text: src.text || ''
    }
    const result = await this.props.startPosProcessing(obj)
    console.log(result)
  }



  render () {
    return (
      <div className='text-scrape-bar'>

        < TextInput />
        <button 
          className='button'
          onClick={() => this.handleSubmitSourceForPOS(nyt_politics)}
        >
            New York Times
        </button>
        <button className='button'>National Geographic</button>
        <button className='button'>ESPN</button>

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