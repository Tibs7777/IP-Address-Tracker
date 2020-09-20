import React from 'react'
import './Banner.scss'

const Banner = props => {

    return (
        <div className="Banner">
            {props.children}
        </div>
    )
}

export default Banner