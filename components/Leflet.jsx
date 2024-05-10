"use client"
import React, { useEffect } from 'react'
import AreaSelect from './Areaselect'
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import 'leaflet-draw/dist/leaflet.draw.css';


const Leflet = () => {

  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={14}
      style={{ height: "100%", width: "100%" }}>
        <AreaSelect/>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}


export default Leflet