import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import SelectArea from "leaflet-area-select";
import Fetchdata from "./Fetchdata";

function AreaSelect() {
  const map = useMap();
  console.log(map);
  const [section, setSection] = useState({});
  useEffect(() => {
    if (!map.selectArea) return;
    map.eachLayer(() => {
      if (layer instanceof L.Polygon) {
        map.removeLayer(layer)
      }
    })

    map.selectArea.enable();
  
    map.on("areaselected", (e) => {
    

      // console.log(e.bounds.toBBoxString()); // lon, lat, lon, lat
      console.log(e.bounds);
      var coordinates = {
        minLatitude: e.bounds._southWest.lat,
        minLongitude: e.bounds._southWest.lng,
        maxLatitude: e.bounds._northEast.lat,
        maxLongitude: e.bounds._northEast.lng,
      };
      console.log(coordinates);
      setSection(coordinates);
      L.rectangle(e.bounds, { color: "blue", weight: 1 }).addTo(map);
    });

    // You can restrict selection area like this:
    const bounds = map.getBounds().pad(-0.25); // save current map bounds as restriction area
    // check restricted area on start and move
    map.selectArea.setValidate((layerPoint) => {
      return bounds.contains(this._map.layerPointToLatLng(layerPoint));
    });

    // now switch it off
    map.selectArea.setValidate();
  }, []);
  
  return (
    <div className="hidden">
      <Fetchdata section={section} />
    </div>

  )
}

export default AreaSelect
