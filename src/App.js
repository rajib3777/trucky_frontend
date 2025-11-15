import axios from 'axios';
import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import TripInputForm from "./components/TripInputForm";
import LogSheet from "./components/LogSheet";
import MapDisplay from "./components/MapDisplay";

function App() {
  const [logData, setLogData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleFormSubmit = async (tripData) => {
    console.log("Form data received in App.js:", tripData);
    setIsLoading(true);
    setError(null);
    setLogData(null);

    try {
      // const fakeData = {
      //   logSheet: {
      //     grid: [
      //       { status: "Off Duty", start: 0, end: 7 },
      //       { status: "On Duty", start: 7, end: 8 },
      //       { status: "Driving", start: 8, end: 12 },
      //       { status: "Off Duty", start: 12, end: 13 },
      //       { status: "Driving", start: 13, end: 17 },
      //       { status: "On Duty", start: 17, end: 18 },
      //       { status: "Off Duty", start: 18, end: 24 },
      //     ],
      //     totals: {
      //       offDuty: 14,
      //       sleeper: 0,
      //       driving: 8,
      //       onDuty: 2,
      //       totalHours: 24,
      //       totalMiles: 450,
      //     },
      //     recap: {
      //       totalHoursLast7Days: 60,
      //       totalHoursAvailableTomorrow: 10,
      //     },
      //     driverInfo: {
      //       totalMilesDrivingToday: 450,
      //       totalMileageToday: 450,
      //     },
      //   },
      //   mapInfo: {
      //     route: [
      //       [23.7104, 90.4074],
      //       [23.4619, 91.185],
      //       [22.3384, 91.8317],
      //     ],
      //     stops: [
      //       { pos: [23.7104, 90.4074], label: "Pickup: Dhaka" },
      //       { pos: [23.4619, 91.185], label: "Rest Stop: Comilla" },
      //       { pos: [22.3384, 91.8317], label: "Dropoff: Chittagong" },
      //     ],
      //     mapCenter: [23.0244, 91.1195],
      //   },
      // };

      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // setLogData(fakeData);

      const response = await axios.post(
        "https://trucky.onrender.com/api/trips/plan/",
        tripData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("API Response:", response.data);

      setLogData(response.data);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Driver's Log Generator</h1>
      </header>

      <main>
        <TripInputForm onSubmit={handleFormSubmit} />
        {isLoading && <div className="loading">Generating Log...</div>}
        {error && <div className="error">Error: {error}</div>}
        {logData && (
          <div className="output-section">
            <MapDisplay mapInfo={logData.mapInfo} />
            <LogSheet logData={logData.logSheet} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
