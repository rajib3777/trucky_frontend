import React from 'react';
import './LogSheet.css'; 

function LogSheet({ logData }) {
  const renderGridRow = (statusName) => {
    const statusEvents = logData.grid.filter(event => event.status === statusName);

    return (
      <div className="grid-row">
        {statusEvents.map((event, index) => {
          const style = {
            left: `${event.start * (100 / 24)}%`,
            width: `${(event.end - event.start) * (100 / 24)}%`
          };
          return <div key={index} className="grid-line" style={style}></div>;
        })}
      </div>
    );
  };

  return (
    <div className="log-sheet-container">
      <h2>Drivers Daily Log</h2>
      <div className="grid-container">
        <div className="grid-labels">
          <div>Off Duty</div>
          <div>Sleeper Berth</div>
          <div>Driving</div>
          <div>On Duty (not driving)</div>
        </div>
        
        <div className="grid-graph">
          {renderGridRow('Off Duty')}
          {renderGridRow('Sleeper Berth')}
          {renderGridRow('Driving')}
          {renderGridRow('On Duty')}

          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="grid-hour-line" style={{ left: `${i * (100 / 24)}%` }}></div>
          ))}

          <div className="grid-time-labels">
            {Array.from({ length: 13 }).map((_, i) => {
              const hour = i * 2;
              const label = hour === 0 ? 'Mid' : (hour === 12 ? 'Noon' : (hour > 12 ? hour - 12 : hour));
              if (hour === 24) return null;
              return <span key={i} style={{ left: `${hour * (100 / 24)}%` }}>{label}</span>
            })}
          </div>
        </div>

        <div className="grid-totals">
          <div className="total-box">{logData.totals.offDuty}</div>
          <div className="total-box">{logData.totals.sleeper}</div>
          <div className="total-box">{logData.totals.driving}</div>
          <div className="total-box">{logData.totals.onDuty}</div>
        </div>
      </div>

      <div className="log-details">
        <div className="detail-item">
          <span>Total Miles Driving Today:</span>
          <strong>{logData.driverInfo.totalMilesDrivingToday}</strong>
        </div>
        <div className="detail-item">
          <span>Total Mileage Today:</span>
          <strong>{logData.driverInfo.totalMileageToday}</strong>
        </div>
      </div>

      <div className="recap-section">
        <h3>Recap</h3>
        <div className="detail-item">
          <span>Total hours on duty last 7 days:</span>
          <strong>{logData.recap.totalHoursLast7Days}</strong>
        </div>
        <div className="detail-item">
          <span>Total hours available tomorrow:</span>
          <strong>{logData.recap.totalHoursAvailableTomorrow}</strong>
        </div>
      </div>
    </div>
  );
}

export default LogSheet;