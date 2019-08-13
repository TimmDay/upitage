import React from 'react';

/* 
A circular button with title and image, with a nice hover animation
rotate, darken, show title
Props:
- imgLink: filepath or url to the image
- title:
- handleOnClick: a function to execute when btn is clicked
*/
const ButtonChooseLang = (props) => (
  <button 
    className="choose-lang"
    onClick={props.handleOnClick}
  >
      <img src={props.imgLink || 'http://lorempixel.com/150/150/'} alt=""/>
      <figcaption>
        <h2>{props.title || 'title here'}</h2>
      </figcaption>
  </button>
);

export default ButtonChooseLang;