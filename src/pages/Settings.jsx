import { useState } from 'react'
import '../styles/Settings.css'

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general')
  const [defaultArea, setDefaultArea] = useState('Zone A')
  const [defaultLanguage, setDefaultLanguage] = useState('English')
  const [outageNotifications, setOutageNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [weatherAlerts, setWeatherAlerts] = useState(true)
  const [weatherThreshold, setWeatherThreshold] = useState('Severe Weeather Event')
  const [powerDataSource, setPowerDataSource] = useState('Smart Meter Sensors')
  const [weatherDataSource, setWeatherDataSource] = useState('OpenWeatherMap API')
  const [connectionStatus, setConnectionStatus] = useState(null)

  const handleTestConnection = () => {
    setConnectionStatus('testing')
    setTimeout(() => {
      setConnectionStatus('success')
      setTimeout(() => setConnectionStatus(null), 3000)
    }, 1500)
  }

  const handleSaveChanges = () => {
    console.log('Settings saved:', {
      defaultArea,
      defaultLanguage,
      outageNotifications,
      emailAlerts,
      weatherAlerts,
      weatherThreshold,
      powerDataSource,
      weatherDataSource
    })
    // Show success message
    alert('Settings saved successfully!')
  }

  return (
    <div className="settings">
      <div className="settings-grid">
        {/* Settings Panel */}
        <div className="settings-panel">
          <h2>Settings Panel</h2>
          
          <div className="settings-menu">
            <button 
              className={`settings-menu-btn ${activeSection === 'general' ? 'active' : ''}`}
              onClick={() => setActiveSection('general')}
            >
              ⚙️ General
            </button>
            <button 
              className={`settings-menu-btn ${activeSection === 'alerts' ? 'active' : ''}`}
              onClick={() => setActiveSection('alerts')}
            >
              🔔 Alert Settings
            </button>
            <button 
              className={`settings-menu-btn ${activeSection === 'datasources' ? 'active' : ''}`}
              onClick={() => setActiveSection('datasources')}
            >
              📊 Data Sources
            </button>
          </div>
        </div>

        {/* Main Settings Content */}
        <div className="panel settings-content">
          {activeSection === 'general' && (
            <>
              <h2>General Settings</h2>

              {/* Default Settings */}
              <div className="settings-section">
                <h3>Default Settings</h3>
                
                <div className="settings-group">
                  <label>Default Area:</label>
                  <select value={defaultArea} onChange={(e) => setDefaultArea(e.target.value)}>
                    <option>Zone A</option>
                    <option>Zone B</option>
                    <option>Zone C</option>
                  </select>
                </div>

                <div className="settings-group">
                  <label>Default Language:</label>
                  <select value={defaultLanguage} onChange={(e) => setDefaultLanguage(e.target.value)}>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeSection === 'alerts' && (
            <>
              <h2>Alert Settings</h2>

              {/* Alert Settings */}
              <div className="settings-section">
                <h3>Notification Preferences</h3>
                
                <div className="toggle-group">
                  <span>🔔 Outage Notifications</span>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={outageNotifications}
                      onChange={(e) => setOutageNotifications(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-group">
                  <span style={{ marginLeft: '32px' }}>📧 Email Alerts</span>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-group">
                  <span>🌦️ Weather Alerts</span>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={weatherAlerts}
                      onChange={(e) => setWeatherAlerts(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-group">
                  <label>Weather Alert Threshold:</label>
                  <select value={weatherThreshold} onChange={(e) => setWeatherThreshold(e.target.value)}>
                    <option>Light Event</option>
                    <option>Moderate Event</option>
                    <option>Severe Weeather Event</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeSection === 'datasources' && (
            <>
              <h2>Data Sources</h2>

              {/* Data Sources */}
              <div className="settings-section">
                <h3>Data Source Configuration</h3>
                
                <div className="settings-group">
                  <label>Power Load Data Source:</label>
                  <select value={powerDataSource} onChange={(e) => setPowerDataSource(e.target.value)}>
                    <option>Smart Meter Sensors</option>
                    <option>SCADA System</option>
                    <option>Industrial IoT</option>
                  </select>
                </div>

                <div className="settings-group">
                  <label>Weather Data Source:</label>
                  <select value={weatherDataSource} onChange={(e) => setWeatherDataSource(e.target.value)}>
                    <option>OpenWeatherMap API</option>
                    <option>Weather.com API</option>
                    <option>Local Weather Station</option>
                  </select>
                  <button 
                    className={`btn-test-connection ${connectionStatus ? connectionStatus : ''}`}
                    onClick={handleTestConnection}
                    disabled={connectionStatus === 'testing'}
                  >
                    {connectionStatus === 'testing' ? 'Testing...' : connectionStatus === 'success' ? '✓ Success' : 'Test Connection'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Save Button */}
          <div className="settings-footer">
            <button className="btn-save-changes" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}