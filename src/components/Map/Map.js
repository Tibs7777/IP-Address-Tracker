import React, { useEffect, useState } from 'react'
import './Map.scss'
import Spinner from '../Spinner/Spinner'



const Map = props => {

    const [map, setMap] = useState()

    const L = window.L

    useEffect(() => {
        const mymap = L.map('mapid')
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGlicyIsImEiOiJja2Y5dTFqdTEwaDgxMnBsZDBrbjlubHZ2In0.qJN_c8RoKyxcuwymQTw-PA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidGlicyIsImEiOiJja2Y5dTFqdTEwaDgxMnBsZDBrbjlubHZ2In0.qJN_c8RoKyxcuwymQTw-PA'
        }).addTo(mymap);
        setMap(mymap)
        console.log('map render')
    }, [L])

    useEffect(() => {
        console.log('setting map')
        if(props.lat){
            // const mymap = L.map('mapid').setView([51.505, -0.09], 13);
            map.setView([props.lat, props.lng], 13);
            const marker = L.marker([props.lat, props.lng]).addTo(map);
            return(() => {
                marker.remove()
            })
        }
    }, [props.lat, props.lng, L, map])


    let loader = null
    if(props.loading) {
        loader = <React.Fragment>
                    <div className="Map-container__loading"></div>
                    <Spinner />
                 </React.Fragment>
    }


    return(
        <div className="Map-container">
            <div id="mapid"></div>
            {loader}
        </div>
    )
}

export default Map