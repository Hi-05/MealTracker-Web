// src/components/TargetManager.jsx
import { useState } from 'react';
import axios from 'axios';

export default function TargetManager({ currentProfile, onProfileUpdate, onClose }) {
  const [energy, setEnergy] = useState(currentProfile?.targetEnergy || '');
  const [protein, setProtein] = useState(currentProfile?.targetProtein || '');

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // 1. Grab the VIP stamp
      const token = localStorage.getItem("jwtToken");

      const newProfile = {
        targetEnergy: parseInt(energy),
        targetProtein: parseInt(protein)
      };

      // 2. Send the request securely using axios
      const response = await axios.post('http://localhost:8080/profiles', newProfile, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onProfileUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating targets:", error);
    }
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