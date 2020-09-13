import React, { useEffect, useState, Fragment } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';

const MarkerList = ({ markers, setSelectedChatRoom }) => {
  const items = markers.map(({ unitid, latitude, longitude }) => {
    return (
      <Marker
        key={unitid}
        position={[latitude, longitude]}
        onClick={() => setSelectedChatRoom(unitid)}
      >
        <Popup>
          id: {unitid}
          <br />
          latitude: {latitude}
          <br />
          longitude: {longitude}
        </Popup>
      </Marker>
    );
  });
  return <Fragment>{items}</Fragment>;
};

const LeafletMap = ({ setSelectedChatRoom }) => {
  const [coordinates, setCoordinates] = useState(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);

      const { latitude, longitude } = position.coords;
      setCoordinates([latitude, longitude]);
    });
  });

  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const API = 'https://data.cityofnewyork.us/resource/5bgh-vtsn.json';
    if (coordinates) {
      axios.get(API).then(function (response) {
        setMarkers(response.data);
      });
    }
  }, [coordinates]);

  return (
    <Map center={coordinates} zoom={25} id='mapid'>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}>
        <Popup>Your location</Popup>
      </Marker>
      <MarkerList markers={markers} setSelectedChatRoom={setSelectedChatRoom} />
    </Map>
  );
};

export default LeafletMap;
