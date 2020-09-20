import React, { useState, useEffect } from 'react'
import Banner from '../../components/Banner/Banner'
import IpTracker from '../../components/IpTracker/IpTracker'
import Map from '../../components/Map/Map'
import Spinner from '../../components/Spinner/Spinner'

const Tracker = props => {

    const initIpDetailsState = {
        ip: null,
        location: {
            city: null,
            postalCode: null,
            lat: null,
            lng: null,
            region: null,
            timezone: null
        },
        isp: null
    }

    const [ip, setIp] = useState('')
    const [ipDetails, setIpDetails] = useState(initIpDetailsState)
    const [loading, setLoading] = useState(false)
    const [adBlockMsg, setAdBlockMsg] = useState(false)


    const trackIp = (ip) => {
        ///simple ip formatting check
        const regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
        let url;
        if (!ip) {
            url=` https://geo.ipify.org/api/v1?apiKey=at_i1pa13Sci3DNjzhh52YFBSJ0lRuoh`
        } else if(ip.match(regex)) {
            url = `https://geo.ipify.org/api/v1?apiKey=at_i1pa13Sci3DNjzhh52YFBSJ0lRuoh&ipAddress=${ip}`
        } else {
            url = `https://geo.ipify.org/api/v1?apiKey=at_i1pa13Sci3DNjzhh52YFBSJ0lRuoh&domain=${ip}`
        }
        setLoading(true)
       return fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setIpDetails({
                ip: res.ip,
                location: {
                    city: res.location.city,
                    postalCode: res.location.postalCode,
                    lat: res.location.lat,
                    lng: res.location.lng,
                    region: res.location.region,
                    timezone: res.location.timezone
                },
                isp: res.isp
            })
            setIp('')
            setLoading(false)
            setAdBlockMsg(false)
        })
        .catch(err => {
            console.log(err)
            if(err = "TypeError: Failed to fetch") {
                setAdBlockMsg(true)
            }
            setLoading(false)
        })
    }
    
    useEffect(() => {
        trackIp()
    }, [])


    let ad = null

    if(adBlockMsg) {
        ad = <h2 style={{position: "absolute", left: "50%", top: "50%", zIndex: '100', transform: "translate(-50%, -50%)"}}>Not loading? Try disabling adblock</h2>
    }


    return (
        <React.Fragment>
            <Banner>
                <IpTracker ip={ip} setIp={setIp} trackIp={trackIp} ipDetails={ipDetails}/>
            </Banner>
            {ad}
            {/* <Spinner /> */}
            <Map lat={ipDetails.location.lat} lng={ipDetails.location.lng} loading={loading}/>   
        </React.Fragment>
    )
}

export default Tracker