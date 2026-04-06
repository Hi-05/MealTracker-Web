// src/components/TargetManager.jsx
import { useState } from 'react';

export default function TargetManager({ currentProfile, onProfileUpdate, onClose }) {
  // Pre-fill with existing targets if they exist
  const [energy, setEnergy] = useState(currentProfile?.targetEnergy || '');
  const [protein, setProtein] = useState(currentProfile?.targetProtein || '');

  const handleSave = (e) => {
    e.preventDefault();
    
    const newProfile = {
      targetEnergy: parseInt(energy),
      targetProtein: parseInt(protein)
    };

    // Send the new targets to your Spring Boot Backend
    fetch('http://localhost:8080/profiles', {
      method: 'POST', // Assuming your backend creates a new historical record!
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProfile)
    })
    .then(res => res.json())
    .then(data => {
      onProfileUpdate(data); // Tell the main app to update the dashboard
      onClose(); // Hide the form
    })
    .catch(err => console.error("Error updating targets:", err));
  };

  return (
    <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ffe69c' }}>
      <h3 style={{ marginTop: 0, color: '#664d03' }}>⚙️ Update Daily Targets</h3>
      
      <form onSubmit={handleSave} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#664d03' }}>New Energy (kcal)</label>
          <input type="number" value={energy} onChange={e => setEnergy(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#664d03' }}>New Protein (g)</label>
          <input type="number" value={protein} onChange={e => setProtein(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        
        <button type="submit" style={{ padding: '9px 15px', backgroundColor: '#198754', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
        <button type="button" onClick={onClose} style={{ padding: '9px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
      </form>
    </div>
  );
}