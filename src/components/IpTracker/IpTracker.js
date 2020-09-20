import React from 'react'
import './IpTracker.scss'
import './IpTrackerInput/IpTrackerInput'
import IpTrackerInput from './IpTrackerInput/IpTrackerInput'
import IpTrackerResults from './IpTrackerResults/IpTrackerResults'

const IpTracker = props => {

    return (
        <div className="IpTracker">
            <h1 className="IpTracker__title">IP Address Tracker</h1>
            <div className="IpTracker__functionality">
                <IpTrackerInput ip={props.ip} setIp={props.setIp} trackIp={props.trackIp}/>
                <IpTrackerResults ip={props.ip} ipDetails={props.ipDetails}/>
            </div>
        </div>
    )
}

export default IpTracker