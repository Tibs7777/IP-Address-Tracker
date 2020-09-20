import React from 'react'
import './IpTrackerInput.scss'

const IpTrackerInput = props => {

    const onChangeHandler = (e) => {
        let value = e.target.value.replace(/\s+/g, '');
        props.setIp(value.toLowerCase())
    }

    const submitHandler = (e, ip) => {
        e.preventDefault()
        props.trackIp(ip)
    }





    return (
        <form className="IpTrackerInput" onSubmit={(e) => submitHandler(e, props.ip)}>
            <input className="IpTrackerInput__input" type="text" placeholder="Search for any IP address or domain" onChange={(e) => onChangeHandler(e)} value={props.ip}/>
            <button className="IpTrackerInput__button"></button>
        </form>
    )
}

export default IpTrackerInput