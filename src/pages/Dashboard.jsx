import { useState } from 'react'
import '../styles/Dashboard.css'

export default function Dashboard() {
  const [selectedArea, setSelectedArea] = useState('Zone A')
  const [selectedDate, setSelectedDate] = useState('24-Apr-2024, 5:30 PM')
  const [weatherCondition, setWeatherCondition] = useState('Heavy Rain')

  const areas = ['Zone A', 'Zone B', 'Zone C']
  const weatherOptions = ['Clear', 'Light Rain', 'Heavy Rain', 'Thunderstorm']

  // Mock data for the risk level (0-100)
  const riskLevel = 78

  // Mock historical data
  const historicalData = [
    { day: 'Mon', outages: 15 },
    { day: 'Tue', outages: 22 },
    { day: 'Wed', outages: 18 },
    { day: 'Thu', outages: 28 },
    { day: 'Fri', outages: 25 },
    { day: 'Sat', outages: 12 },
    { day: 'Sun', outages: 20 }
  ]

  const maxOutages = Math.max(...historicalData.map(d => d.outages))

  const getRiskColor = (level) => {
    if (level < 30) return '#4CAF50' // Green
    if (level < 60) return '#FFC107' // Yellow
    if (level < 80) return '#FF9800' // Orange
    return '#F44336' // Red
  }

  const getRiskLabel = (level) => {
    if (level < 30) return 'LOW RISK'
    if (level < 60) return 'MEDIUM RISK'
    if (level < 80) return 'HIGH RISK'
    return 'CRITICAL RISK'
  }

  const getRiskBgColor = (level) => {
    if (level < 30) return '#c8e6c9'
    if (level < 60) return '#ffe0b2'
    if (level < 80) return '#ffccbc'
    return '#ffcdd2'
  }

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* Input Panel */}
        <div className="panel input-panel">
          <h2>Input Panel</h2>
          
          <div className="form-group">
            <label>Select Area:</label>
            <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date & Time:</label>
            <input 
              type="text" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Weather Condition:</label>
            <select value={weatherCondition} onChange={(e) => setWeatherCondition(e.target.value)}>
              {weatherOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <button className="btn-predict">Predict Risk</button>
        </div>

        {/* Outage Risk Level */}
        <div className="panel risk-panel">
          <h2>Outage Risk Level</h2>
          
          {/* Risk Gradient Bar */}
          <div className="risk-gradient-container">
            <div className="risk-gradient">
              <div 
                className="risk-indicator"
                style={{
                  left: `${riskLevel}%`,
                  backgroundColor: getRiskColor(riskLevel)
                }}
              ></div>
            </div>
          </div>

          {/* Risk Badge */}
          <div 
            className="risk-badge"
            style={{ backgroundColor: getRiskBgColor(riskLevel) }}
          >
            <span style={{ color: getRiskColor(riskLevel) }}>⚠️</span>
            <span style={{ color: getRiskColor(riskLevel) }}>{getRiskLabel(riskLevel)}</span>
          </div>

          {/* AI Analysis */}
          <div className="ai-analysis">
            <h3>AI Analysis</h3>
            <p>High risk of <strong>blackout</strong> due to heavy rain and peak evening load.</p>
            <p><strong>Transformer overload</strong> detected.</p>
            <p style={{ color: '#F44336', fontWeight: 'bold' }}>⚠️ Immediate action recommended.</p>
          </div>

          {/* Preventive Actions */}
          <div className="preventive-actions">
            <h3>Preventive Actions</h3>
            <ul>
              <li>Reduce power usage during peak hours.</li>
              <li>Schedule transformer inspection.</li>
              <li>Activate backup generators.</li>
            </ul>
          </div>

          {/* Historical Chart */}
          <div className="historical-trend">
            <h3>Historical Outage Trend</h3>
            <div className="chart-legend">
              <span style={{ color: '#FF9800' }}>● Power Outages</span>
            </div>
            <div className="simple-chart">
              {historicalData.map((data, index) => (
                <div key={index} className="chart-bar-wrapper">
                  <div 
                    className="chart-bar"
                    style={{
                      height: `${(data.outages / maxOutages) * 100}%`,
                      backgroundColor: '#FF9800'
                    }}
                  ></div>
                  <span className="chart-label">{data.day}</span>
                </div>
              ))}
            </div>
            <div className="chart-footer">Last 7 Days</div>
          </div>
        </div>
      </div>
    </div>
  )
}