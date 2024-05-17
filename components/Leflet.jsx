"use client"
import React, { useEffect } from 'react'
import AreaSelect from './Areaselect'
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw'

const Leflet = () => {
  return (
    <>
      <MapContainer
        center={[20, 40]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}>
        {/* <AreaSelect/> */}
        <FeatureGroup>
          <EditControl onCreated={(e) => {
            // مختصات مستطیل را از e.layer دریافت کنید
            const rectangleBounds = e.layer.getBounds();
            var coordinates = {
              minLatitude: rectangleBounds._southWest.lat,
              minLongitude: rectangleBounds._southWest.lng,
              maxLatitude: rectangleBounds._northEast.lat,
              maxLongitude: rectangleBounds._northEast.lng,
            };
            localStorage.setItem('coordinates',JSON.stringify(coordinates))
            window.dispatchEvent(new Event("storage"));////رهقفعشم ثرثى
          }} position='topright' onDrawStop={(e) => console.log(e.target)} draw={{ circle: false, circlemarker: false, marker: false, polygon: false, polyline: false }} />
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      </MapContainer>

    </>

  );
}
export default Leflet