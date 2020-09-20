import React from 'react'
import './IpTrackerInput.scss'

const IpTrackerInput = props => {

    const onChangeHandler = (e) => {
        props.setError(null)
        let value = e.target.value.replace(/\s+/g, '');
        props.setIp(value.toLowerCase())
    }

    const submitHandler = (e, ip) => {
        e.preventDefault()
        props.trackIp(ip)
    }

    let classes = "IpTrackerInput"
    if(props.error) {
        classes += ' IpTrackerInput--error'
    }

    return (
        <form className={classes} onSubmit={(e) => submitHandler(e, props.ip)}>
            <input className="IpTrackerInput__input" type="text" placeholder={ props.error ? props.error : "Search for any IP address or domain"} onChange={(e) => onChangeHandler(e)} value={props.ip}/>
            {/* <span className="IpTrackerInput__error">Test error message that is longer</span> */}
            <button className="IpTrackerInput__button"></button>
        </form>
    )
}

export default IpTrackerInput