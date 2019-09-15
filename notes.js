
fetch('https://httpbin.org/post', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({a: 7, str: 'Some string: &=&'})
}).then(res=>res.json())
  .then(res => console.log(res));


  // from wordsgoin component
  //single word (use query string)
  // handleSubmitSourceForPOS = async (evt) => {
  //   evt.preventDefault();
  //   console.log('submitting');

  //   await this.setState({source: this.state.textBody})
  //   const word = this.state.textBody;
  //   console.log(word);
    
  //   // TODO: extract out into utils file?
  //   const res = await fetch('http://localhost:3000/postag-word?word=' + word
  //     // headers: { 
  //     //   'Content-Type': 'application/json',
  //     //   'Accept': 'application/json'
  //     // }
  //   )
  //   const data = await res.json() // clone?
  //   console.log(data)
    
  //     let words = [];
  //     let tags = [];
  //     data.tag.split(' ').forEach(wordAndTag => {
  //       const bits = wordAndTag.split('_')
  //       words.push(bits[0])
  //       tags.push(bits[1])
  //     })

  //     this.setState({ 
  //       taggedText: data.tag,
  //       rawText: words,
  //       tags: tags
  //     })
  //     // TODO: also to redux store
  // }





    // full text (use request body)
    handleSubmitSourceForPOS = async (evt) => {
      evt.preventDefault();
      await this.setState({source: this.state.textBody})
      const text = this.state.textBody;
      console.log(text)
      
  
      // TODO: 
      // 1. sentence segmentation. get array back
      const sents = nlp.string.sentences(text)
      console.log(sents)
  
      let taggedPara = []
  
      sents.forEach(async sent => {
  
        const res = await fetch('http://localhost:3000/postag-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // redirect: 'follow',
          body: JSON.stringify({text: sent})
        })
        const data = await res.json() // clone?
        let words = [];
        let tags = [];
        taggedPara.push(data)
        // data.tag.split(' ').forEach(wordAndTag => {
        //   const bits = wordAndTag.split('_')
        //   words.push(bits[0])
        //   tags.push(bits[1])
        // })
      })
      
      // send sentences to pos tagger one at a time
      // as results come in, build the big result
      // once finished with array of sentences, construct data
  
  
      // TODO: extract out into utils file?
      console.log(taggedPara)
      
      this.setState({ 
        // taggedText: data.tag,
        rawText: sents,
        tags: taggedPara
      })
      // TODO: also to redux store
    }