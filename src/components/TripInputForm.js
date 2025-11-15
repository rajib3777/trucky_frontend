import React, { useState } from 'react';

function TripInputForm({ onSubmit }) {
  const [currentLocation, setCurrentLocation] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [currentCycleUsed, setCurrentCycleUsed] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const tripData = {
      currentLocation,
      pickupLocation,
      dropoffLocation,
      currentCycleUsed,
    };
    onSubmit(tripData);
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <h3>Enter Trip Details</h3>
      
      <div className="form-group">
        <label>Current Location:</label>
        <input
          type="text"
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Pickup Location:</label>
        <input
          type="text"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Dropoff Location:</label>
        <input
          type="text"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Current Cycle Used (Hrs):</label>
        <input
          type="number"
          min="0"
          value={currentCycleUsed}
          onChange={(e) => setCurrentCycleUsed(parseFloat(e.target.value) || 0)}
          required
        />
      </div>

      <button type="submit">Generate Log</button>
    </form>
  );
}

export default TripInputForm;