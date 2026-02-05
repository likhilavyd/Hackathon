import { useState } from 'react'
import '../styles/History.css'

export default function History() {
  const [selectedArea, setSelectedArea] = useState('All Zones')
  const [selectedWeather, setSelectedWeather] = useState('All Conditions')
  const [selectedRisk, setSelectedRisk] = useState('All Levels')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Date / Time')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  const areaOptions = ['All Zones', 'Zone A', 'Zone B', 'Zone C']
  const weatherOptions = ['All Conditions', 'Clear', 'Heavy Rain', 'Thunderstorm']
  const riskOptions = ['All Levels', 'Low Risk', 'Medium Risk', 'High Risk']

  // Mock data
  const allOutageData = [
    { id: 1, date: '24-Apr-2024, 5:30 PM', area: 'Zone A', weather: 'Heavy Rain', risk: 'High Risk', color: '#F44336' },
    { id: 2, date: '23-Apr-2024, 2:15 PM', area: 'Zone C', weather: 'Clear', risk: 'Low Risk', color: '#4CAF50' },
    { id: 3, date: '23-Apr-2024, 8:00 AM', area: 'Zone A', weather: 'Heavy Rain', risk: 'Medium Risk', color: '#FFC107' },
    { id: 4, date: '22-Apr-2024, 7:00 PM', area: 'Zone B', weather: 'Thunderstorm', risk: 'High Risk', color: '#F44336' },
    { id: 5, date: '21-Apr-2024, 6:00 PM', area: 'Zone C', weather: 'Clear', risk: 'Medium Risk', color: '#FF9800' },
    { id: 6, date: '20-Apr-2024, 3:30 PM', area: 'Zone A', weather: 'Heavy Rain', risk: 'High Risk', color: '#F44336' },
    { id: 7, date: '19-Apr-2024, 9:00 AM', area: 'Zone B', weather: 'Light Rain', risk: 'Low Risk', color: '#4CAF50' },
    { id: 8, date: '18-Apr-2024, 5:45 PM', area: 'Zone C', weather: 'Clear', risk: 'Low Risk', color: '#4CAF50' },
    { id: 9, date: '17-Apr-2024, 4:15 PM', area: 'Zone A', weather: 'Thunderstorm', risk: 'High Risk', color: '#F44336' },
    { id: 10, date: '16-Apr-2024, 2:00 PM', area: 'Zone B', weather: 'Clear', risk: 'Medium Risk', color: '#FFC107' },
    { id: 11, date: '15-Apr-2024, 6:30 PM', area: 'Zone A', weather: 'Heavy Rain', risk: 'High Risk', color: '#F44336' },
    { id: 12, date: '14-Apr-2024, 8:00 AM', area: 'Zone C', weather: 'Clear', risk: 'Low Risk', color: '#4CAF50' },
    { id: 13, date: '13-Apr-2024, 3:20 PM', area: 'Zone B', weather: 'Light Rain', risk: 'Medium Risk', color: '#FF9800' },
    { id: 14, date: '12-Apr-2024, 5:00 PM', area: 'Zone A', weather: 'Thunderstorm', risk: 'High Risk', color: '#F44336' },
    { id: 15, date: '11-Apr-2024, 1:30 PM', area: 'Zone C', weather: 'Clear', risk: 'Low Risk', color: '#4CAF50' },
  ]

  // Filter data
  let filteredData = allOutageData.filter(item => {
    const areaMatch = selectedArea === 'All Zones' || item.area === selectedArea
    const weatherMatch = selectedWeather === 'All Conditions' || item.weather === selectedWeather
    const riskMatch = selectedRisk === 'All Levels' || item.risk === selectedRisk
    const searchMatch = item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.area.toLowerCase().includes(searchTerm.toLowerCase())
    
    return areaMatch && weatherMatch && riskMatch && searchMatch
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const startIdx = (currentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(startIdx, startIdx + rowsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="history">
      <div className="history-grid">
        {/* Quick Filter */}
        <div className="panel filter-panel">
          <h2>Quick Filter</h2>
          
          <div className="filter-group">
            <label>Select Area:</label>
            <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
              {areaOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Weather Condition:</label>
            <select value={selectedWeather} onChange={(e) => setSelectedWeather(e.target.value)}>
              {weatherOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Risk Level:</label>
            <select value={selectedRisk} onChange={(e) => setSelectedRisk(e.target.value)}>
              {riskOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <button className="btn-apply-filters">Apply Filters</button>
        </div>

        {/* Outage History Table */}
        <div className="panel table-panel">
          <h2>Outage History</h2>
          
          <div className="table-header">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <table className="outage-table">
            <thead>
              <tr>
                <th>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option>Date / Time</option>
                    <option>Area</option>
                    <option>Risk Level</option>
                  </select>
                </th>
                <th>Area</th>
                <th>Weather</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(item => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.area}</td>
                  <td>{item.weather}</td>
                  <td>
                    <span 
                      className="risk-badge-inline"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <span className="rows-per-page">
              Rows per page:
              <select value={rowsPerPage} onChange={(e) => setRowsPerPage(parseInt(e.target.value))}>
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </select>
            </span>
            <span className="page-info">
              {startIdx + 1}-{Math.min(startIdx + rowsPerPage, filteredData.length)} of {filteredData.length}
            </span>
            <div className="pagination-buttons">
              <button onClick={handlePrevious} disabled={currentPage === 1}>‹</button>
              <button onClick={handleNext} disabled={currentPage === totalPages}>›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}