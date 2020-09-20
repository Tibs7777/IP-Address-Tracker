import React from 'react'
import './IpTrackerResults.scss'


const IpTrackerResults = props => {

    // if(props.ipDetails.location) {
    //     console.log(props.ipDetails.location)
    // }


    return (
        <div className="IpTrackerResults">
            <div className="IpTrackerResult">
                <span className="IpTrackerResult__title">Ip Address</span>
                <span className="IpTrackerResult__details">{props.ipDetails.ip ? props.ipDetails.ip : ''}</span>
            </div>
            <div className="IpTrackerResults__divider"></div>
            <div className="IpTrackerResult">
                <span className="IpTrackerResult__title">Location</span>
                
                <span className="IpTrackerResult__details">{props.ipDetails.location.city ? `${props.ipDetails.location.city}, ${props.ipDetails.location.region} ${props.ipDetails.location.postalCode}` : ''}</span>
            </div>
            <div className="IpTrackerResults__divider"></div>
            <div className="IpTrackerResult">
                <span className="IpTrackerResult__title">Timezone</span>
                <span className="IpTrackerResult__details">{props.ipDetails.location.timezone ? `${props.ipDetails.location.timezone}` : null}</span>
            </div>
            <div className="IpTrackerResults__divider"></div>
            <div className="IpTrackerResult">
                <span className="IpTrackerResult__title">ISP</span>
                <span className="IpTrackerResult__details">{props.ipDetails.isp ? `${props.ipDetails.isp}` : null}</span>
            </div>
        </div>
    )
}

export default IpTrackerResults