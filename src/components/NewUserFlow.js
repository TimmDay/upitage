import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import ButtonChooseLang from './ButtonChooseLang';
import { selectLangInstruction, selectLangTarget } from '../actions/newUserFlow';
import { mapLangToISpeak, mapLangToILearn } from '../utils/mapLang';

class NewUserFlow extends React.Component {
  constructor(props) {
      super(props);
      this.state = {}
  }

  render () {
    return (
      <div className='new-user-flow'>
        <div className='container'>
            <p className='NUF__instruction'>{mapLangToISpeak(this.props.langInstruction)}</p>

            <ButtonChooseLang
              title='English'
              imgLink='/images/flags-btn-round/flag-uk-button-round-500.png'
              handleOnClick={()=> this.props.selectLangInstruction('EN')}
            />
            <ButtonChooseLang
              title='Deutsch'
              imgLink='/images/flags-btn-round/flag-germany-button-round-500.png'
              handleOnClick={()=> this.props.selectLangInstruction('DE')}
            />
            <ButtonChooseLang
              title='Español'
              imgLink='/images/flags-btn-round/flag-spain-button-round-500.png'
              handleOnClick={()=> this.props.selectLangInstruction('ES')}
            />
        </div>
        
        <div className='container'>
          <p className='NUF__instruction'>{mapLangToILearn(this.props.langInstruction)}</p>

          <ButtonChooseLang
            title='English'
            imgLink='/images/flags-btn-round/flag-uk-button-round-500.png'
            handleOnClick={()=> this.props.selectLangTarget('EN')}
          />

          <ButtonChooseLang
            title='Deutsch'
            imgLink='/images/flags-btn-round/flag-germany-button-round-500.png'
            handleOnClick={()=> this.props.selectLangTarget('DE')}
          />
        
          <ButtonChooseLang
            title='Español'
            imgLink='/images/flags-btn-round/flag-spain-button-round-500.png'
            handleOnClick={()=> this.props.selectLangTarget('ES')}
          />
        </div>

        <Link className="" to={`/words-go-in`}>
          <button className='new-user-flow__btn'>next</button>
        </Link>
      </div>
    )
   }
}


const mapStateToProps = (state) => {
  return {
    langInstruction: state.userOptions.langInstruction,
  }
};

const mapDispatchToProps = (dispatch) => ({
  selectLangInstruction: lang => dispatch(selectLangInstruction(lang)),
  selectLangTarget: lang => dispatch(selectLangTarget(lang))

});

export default connect(mapStateToProps, mapDispatchToProps)(NewUserFlow);
