import React from 'react';
import { connect } from 'react-redux';
import TextInput from './TextInput'


class TextScrapeBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {}
  }

  render () {
    return (
      <div className='text-scrape-bar'>

        < TextInput />
        <button className='button'>New York Times</button>
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
   
});

export default connect(mapStateToProps, mapDispatchToProps)(TextScrapeBar);