import React from 'react';
import { connect } from 'react-redux';


class WordsGoIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textBody: ''
    }
  }

  handleChangeTextArea = (evt) => {
    this.setState({textBody: evt.target.value})
  }

  handleHighlightVerbs = () => {
    console.log('highlight verbs');
    const tagsArr = document.getElementsByClassName('wgi__tags');

    let vMatch = []
    for (let i=0; i<tagsArr.length; i++) {
      if(tagsArr[i].innerHTML[1] === 'V') { //they all start with space, so 1 not 0
        vMatch.push(i)
      }
    }
    
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    vMatch.forEach(match => {
      wordsArr[match].style = 'background:red;'
    })
  }


  handleHighlightNouns = () => {
    console.log('highlight nouns');
    const tagsArr = document.getElementsByClassName('wgi__tags');

    let vMatch = []
    for (let i=0; i<tagsArr.length; i++) {
      if(tagsArr[i].innerHTML[1] === 'N') { //they all start with space, so 1 not 0
        vMatch.push(i)
      }
    }
    
    const wordsArr = document.getElementsByClassName('wgi__raw-text');
    vMatch.forEach(match => {
      wordsArr[match].style = 'background:green;'
    })
  }


  handleSubmitSourceForPOS = (evt) => {
    evt.preventDefault();
    console.log('submitting');

    this.setState({source: this.state.textBody})
    //TODO:
    // clear text area
    // confirmation modal, then push to next page

    const word = this.state.textBody;
    console.log(word);
    
    // TODO: extract out into utils file?
    fetch('http://localhost:3000/treated-text?word=' + word)
    .then(res => {
      res.json()
      .then(data => {
        let words = [];
        let tags = [];
        data.tag.split(' ').forEach(wordAndTag => {
          const bits = wordAndTag.split('_')
          words.push(bits[0])
          tags.push(bits[1])
        })
        console.log(words);
        console.log(tags);

        this.setState({ 
          taggedText: data.tag,
          rawText: words,
          tags: tags
        })

        // TODO: also to redux store
      })
    })
  }

  handleHoverWord = (evt) => {
    console.log(evt)
    console.log(evt.target)
    console.log(evt.target.innerText)


    const word = evt.target.innerText;
    console.log('WORD ROM COMP: ', word)


    fetch('http://localhost:3000/translated-text?word=' + word)
    .then(res => {
      res.json()
      .then(data => {
        console.log(data);
      })
    })
  }

  render () {
    return (
      <div>
        <h1>Drop some Relevant Language here</h1>
        <form id='source-text' onSubmit={this.handleSubmitSourceForPOS}>
          <textarea 
            className='source-area'
            value={this.state.textBody}
            onChange={this.handleChangeTextArea}
          />
          <button>submit text</button>
        </form>

        {/* TODO: map a span for each word in here. can then target spans by index, matching POS to textBody for highlighting */}
        {
          !this.state.rawText ? (
            <p>no source text</p>
          ) : (
            // this.state.rawText.map(w => (
            //   <span key={`key${w}`}>{`${w} `}</span>
            // )
            // <span>{this.state.rawText}</span>
            <div>
            <p>
            {this.state.rawText.map((w,i) => (
              <span
                className='wgi__raw-text'
                onMouseEnter={this.handleHoverWord}
                onMouseLeave={this.handleHoverWordLeave}
                key={`key${w}${i}`}
              >{` ${w}`}</span>
            ))}
            </p>

            <p>
            {this.state.tags.map((w,i) => (
              <span
                key={`key${w}${i}`}
                className='wgi__tags'
              >{` ${w}`}</span>
            ))}
            </p>
            </div>
          )
        }

      {/* {this.state.rawText && <p>{this.state.rawText}</p>} */}

      <button 
        disabled={!this.state.taggedText}
        onClick={this.handleHighlightVerbs}
      >
        select verbs
      </button>

      <button 
        disabled={!this.state.taggedText}
        onClick={this.handleHighlightNouns}
      >
        select nouns
      </button>


        {/* TODO: make a component that takes the text as a prop */}
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

export default connect(mapStateToProps, mapDispatchToProps)(WordsGoIn);


// import React, { useState } from 'react';

// const WordsGoIn = () => {
//   const [source, setSource] = useState('');
//   const [textBody, setTextBody] = useState(''); //for the text area state

//   const submitSource = (evt) => {
//     evt.preventDefault();
//     setSource(source)
//     // clear text area
//     // confirmation modal, then push to next page
//   }

//   return (
//     <div>
//       <h1>Drop some Relevant Language here</h1>
//       <form onSubmit={submitSource}>
//         <textarea 
//           value={textBody}
//           onChange={(evt) => setTextBody(evt.target.value)}
//         />
//         <button>submit text</button>
//       </form>
//     </div>
//   )
// };

// export default WordsGoIn;