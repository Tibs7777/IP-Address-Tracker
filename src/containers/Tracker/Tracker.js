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
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }
    
    useEffect(() => {
        trackIp()
    }, [])



    return (
        <React.Fragment>
            <Banner>
                <IpTracker ip={ip} setIp={setIp} trackIp={trackIp} ipDetails={ipDetails}/>
            </Banner>
            <Map lat={ipDetails.location.lat} lng={ipDetails.location.lng} loading={loading}/>
        </React.Fragment>
    )
}

export default Tracker