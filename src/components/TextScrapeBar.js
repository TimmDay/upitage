import React from 'react';
import { connect } from 'react-redux';

import { startPosProcessing, startFleschKincaid } from '../actions/inputText'
import nyt_politics from './../utils/text_scraper/en_nyt_politics';
import nat_geo from './../utils/text_scraper/en_nat_geo';
import espn from './../utils/text_scraper/en_espn';
import nasa from './../utils/text_scraper/en_nasa_blog';

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
    // only if english text
    this.props.startFleschKincaid(obj.text)
  }



  render () {
    return (

      <div className="content-container">
        <div className='text-scrape-bar'>

          <img 
            className="text-scrape-bar__icon" 
            src="/images/icons/logo-nyt-rnd.png" 
            onClick={() => this.handleSubmitSourceForPOS(nyt_politics)}
          />

          <img 
            className="text-scrape-bar__icon" 
            src="/images/icons/logo-nat-geo.png" 
            onClick={() => this.handleSubmitSourceForPOS(nat_geo)}
          />

          <img 
            className="text-scrape-bar__icon" 
            src="/images/icons/logo-espn.png" 
            onClick={() => this.handleSubmitSourceForPOS(espn)}
          />

          <img 
            className="text-scrape-bar__icon" 
            src="/images/icons/logo-nasa.png" 
            onClick={() => this.handleSubmitSourceForPOS(nasa)}
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
  startPosProcessing: (src) => dispatch(startPosProcessing(src)),
  startFleschKincaid: (str) => dispatch(startFleschKincaid(str)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextScrapeBar);