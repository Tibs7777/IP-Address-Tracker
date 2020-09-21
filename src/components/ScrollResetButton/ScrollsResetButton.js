import React from 'react'
import './ScrollResetButton.scss'

const ScrollResetButton = props => {

    const clickHandler = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }


    let button = null

    if(props.show) {
        button = <div className="ScrollResetButton" onClick={clickHandler}></div>
    }

    return button
}

export default ScrollResetButton