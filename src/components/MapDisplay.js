import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import './MapDisplay.css';

function MapDisplay({ mapInfo }) {
  const center = mapInfo.mapCenter || [39.82, -98.58];

  return (
    <div className="map-container-wrapper">
      <h3>Trip Route</h3>
      <MapContainer center={center} zoom={6} className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mapInfo.route && (
          <Polyline positions={mapInfo.route} color="blue" />
        )}

        {mapInfo.stops && mapInfo.stops.map((stop, index) => (
          <Marker key={index} position={stop.pos}>
            <Popup>{stop.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapDisplay;