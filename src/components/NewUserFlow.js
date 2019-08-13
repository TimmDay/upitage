import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import ButtonChooseLang from './ButtonChooseLang';
import { selectLangInstruction, selectLangTarget } from '../actions/newUserFlow';


class NewUserFlow extends React.Component {
  constructor(props) {
      super(props);
      this.state = {}
  }

  render () {
    return (
      <div className='new-user-flow'>
        { !this.props.langInstruction && <p>I speak...</p> }
        { this.props.langInstruction === 'EN' && <p>I speak...</p> }
        { this.props.langInstruction === 'DE' && <p>Ich spreche...</p> }
        { this.props.langInstruction === 'ES' && <p>Yo..</p> }
        <div className='container'>
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

        { !this.props.langInstruction && <p>I want to learn...</p> }
        { this.props.langInstruction === 'EN' && <p>I want to learn...</p> }
        { this.props.langInstruction === 'DE' && <p>Ich will das lernen...</p> }
        { this.props.langInstruction === 'ES' && <p>burritos..</p> }
        
        <div className='container'>
          {this.props.langInstruction !== 'EN' &&
          <ButtonChooseLang
            title='English'
            imgLink='/images/flags-btn-round/flag-uk-button-round-500.png'
            handleOnClick={()=> this.props.selectLangTarget('EN')}
          />
          }

          {this.props.langInstruction !== 'DE' &&
          <ButtonChooseLang
            title='Deutsch'
            imgLink='/images/flags-btn-round/flag-germany-button-round-500.png'
            handleOnClick={()=> this.props.selectLangTarget('DE')}
          />
          }
          
          {this.props.langInstruction !== 'ES' &&
          <ButtonChooseLang
            title='Español'
            imgLink='/images/flags-btn-round/flag-spain-button-round-500.png'
            handleOnClick={()=> this.props.selectLangTarget('ES')}
          />
          }
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
    langInstruction: state.newUserFlowReducer.langInstruction,
  }
};

const mapDispatchToProps = (dispatch) => ({
  selectLangInstruction: lang => dispatch(selectLangInstruction(lang)),
  selectLangTarget: lang => dispatch(selectLangTarget(lang))

});

export default connect(mapStateToProps, mapDispatchToProps)(NewUserFlow);
