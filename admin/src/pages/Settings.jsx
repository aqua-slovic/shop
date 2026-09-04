import React, { useState } from 'react';
import '../styles/settings.css';

function Settings() {
  const [settings, setSettings] = useState({
    storeName: 'Royal D Studio',
    storeEmail: 'wisdommalata@royaldstudio.com',
    storePhone: '+265 983 46 83 81',
    currency: 'MWK',
    taxRate: '8',
    freeShippingThreshold: '170000',
    shippingRate: '16983'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = 'Settings saved successfully';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your store configuration</p>
        </div>
      </div>

      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="settings-panel">
          <h2>Store Information</h2>
          <div className="settings-row">
            <div className="form-group">
              <label>Store Name</label>
              <input type="text" name="storeName" value={settings.storeName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Store Email</label>
              <input type="email" name="storeEmail" value={settings.storeEmail} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="storePhone" value={settings.storePhone} onChange={handleChange} />
          </div>
        </div>

        <div className="settings-panel">
          <h2>Commerce Settings</h2>
          <div className="settings-row">
            <div className="form-group">
              <label>Currency</label>
              <select name="currency" value={settings.currency} onChange={handleChange}>
                <option value="MWK">MWK - Malawian Kwacha</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tax Rate (%)</label>
              <input type="number" name="taxRate" value={settings.taxRate} onChange={handleChange} step="0.1" />
            </div>
          </div>
          <div className="settings-row">
            <div className="form-group">
              <label>Free Shipping Threshold (MK)</label>
              <input type="number" name="freeShippingThreshold" value={settings.freeShippingThreshold} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Shipping Rate (MK)</label>
              <input type="number" name="shippingRate" value={settings.shippingRate} onChange={handleChange} step="0.01" />
            </div>
          </div>
        </div>

        <div className="settings-form-actions">
          <button type="submit" className="btn btn-accent">Save Settings</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
