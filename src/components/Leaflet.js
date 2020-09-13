import React, { useEffect, useState } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const LeafletMap = () => {
    const [coordinates, setCoordinates] = useState([]);
    useEffect( async function (params) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            coordinates.push(position.coords.latitude);
            coordinates.push(position.coords.longitude);
        });
    })
    return (
        <>
        { coordinates ?
            (
                <Map center={coordinates} zoom={13} id = "mapid">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                    <Marker position={coordinates}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                </Map>
            ): null
        }
        </>)
    
};

export default LeafletMap; 