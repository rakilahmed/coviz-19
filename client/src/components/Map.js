import React from 'react';
import './Map.css';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from './util';

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          maxZoom="7"
          attribution="&copy; <a href=https://carto.com/>Carto</a> contributors"
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
