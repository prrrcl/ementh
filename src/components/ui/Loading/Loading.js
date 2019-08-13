import React from 'react';
import './Loading.min.css'

const Loading = (props) => {
  
  const {isOut} = props;
  const classIsOut = isOut ? '' : 'is-active';

  return (
    <div className={`loading ${classIsOut}`}>
      <div className="loader">
        <div className="loading-bar"></div>
      </div>
    </div>
  )
}

export default Loading
