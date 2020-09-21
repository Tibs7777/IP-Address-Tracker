import React, { useState, useEffect, useCallback } from 'react'
import Banner from '../../components/Banner/Banner'
import IpTracker from '../../components/IpTracker/IpTracker'
import Map from '../../components/Map/Map'
import ScrollResetButton from '../../components/ScrollResetButton/ScrollsResetButton'

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
    const [error, setError] = useState(null)
    const [showScrollButton, setShowScrollButton] = useState(false)


    const trackIp = useCallback((ip) => {
        ///simple ip formatting check
        const regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
        let url;
        if (!ip) {
            return
        } else if(ip === "me") {
            url = `https://geo.ipify.org/api/v1?apiKey=at_i1pa13Sci3DNjzhh52YFBSJ0lRuoh`
        } else if(ip.match(regex)) {
            url = `https://geo.ipify.org/api/v1?apiKey=at_i1pa13Sci3DNjzhh52YFBSJ0lRuoh&ipAddress=${ip}`
        } else {
            url = `https://geo.ipify.org/api/v1?apiKey=at_i1pa13Sci3DNjzhh52YFBSJ0lRuoh&domain=${ip}`
        }
        setError(null)
        setLoading(true)
       return fetch(url)
        .then(res => res.json())
        .then(res => {
            if(res.ip){
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
        } else {
            throw new Error(res.messages)
        }
        })
        .catch(err => {
            console.log(err.message)
            console.dir(err)
            setLoading(false)
            if(err.message === "Failed to fetch") {
                setAdBlockMsg(true)
            } else {
                setAdBlockMsg(false)
                setError(err)
                setIp('')
                }
            }
        )
    }, [])
    
    useEffect(() => {
        trackIp("me")
    }, [trackIp])

    const handleScroll = useCallback(() => {
        if(window.scrollY > 50) {
            setShowScrollButton(true)
        } else {
            setShowScrollButton(false)
        }
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return(() => {
            window.removeEventListener("scroll", handleScroll)
        })
    }, [handleScroll])


    let ad = null

    if(adBlockMsg) {
        ad = <h2 style={{position: "absolute", left: "50%", top: "50%", zIndex: '100', transform: "translate(-50%, -50%)", background: '#2c2c2c', color: 'white'}}>Not loading? Try disabling adblock</h2>
    }


    return (
        <React.Fragment>
            <Banner>
                <IpTracker ip={ip} setIp={setIp} trackIp={trackIp} ipDetails={ipDetails} error={error} setError={setError}/>
            </Banner>
            {ad}
            <Map lat={ipDetails.location.lat} lng={ipDetails.location.lng} loading={loading}/>
            <ScrollResetButton show={showScrollButton}/> 
        </React.Fragment>
    )
}

export default Tracker