// src/components/MealForm.jsx
import { useState, useEffect } from 'react';

export default function MealForm({ onMealAdded, onMealUpdated, editingMeal, onCancelEdit }) {
  const [name, setName] = useState('');
  const [energy, setEnergy] = useState('');
  const [protein, setProtein] = useState('');

  // SDE Trick: Watch the 'editingMeal' variable. If it changes, fill the boxes!
  useEffect(() => {
    if (editingMeal) {
      setName(editingMeal.name);
      setEnergy(editingMeal.energy || '');
      setProtein(editingMeal.protein);
    } else {
      // Clear boxes if we are not editing
      setName('');
      setEnergy('');
      setProtein('');
    }
  }, [editingMeal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const mealPayload = {
      name: name,
      energy: parseInt(energy),
      protein: parseInt(protein)
    };

    if (editingMeal) {
      // --- UPDATE MODE (PUT Request) ---
      fetch(`http://localhost:8080/meals/${editingMeal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealPayload)
      })
      .then(response => response.json())
      .then(updatedMeal => {
        onMealUpdated(updatedMeal);
      })
      .catch(error => console.error("Error updating meal:", error));

    } else {
      // --- CREATE MODE (POST Request) ---
      fetch('http://localhost:8080/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealPayload)
      })
      .then(response => response.json())
      .then(savedMeal => {
        onMealAdded(savedMeal);
        setName(''); setEnergy(''); setProtein('');
      })
      .catch(error => console.error("Error saving meal:", error));
    }
  };

  return (
    <div style={{ backgroundColor: '#e9ecef', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h3 style={{ marginTop: 0 }}>{editingMeal ? '✏️ Edit Meal' : 'Log a New Meal'}</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Meal Name" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="number" placeholder="Energy (kcal)" value={energy} onChange={e => setEnergy(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="number" placeholder="Protein (g)" value={protein} onChange={e => setProtein(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: editingMeal ? '#198754' : '#0d6efd', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {editingMeal ? 'Save Changes' : 'Add Meal'}
          </button>
          
          {/* Show a Cancel button only if we are editing */}
          {editingMeal && (
            <button type="button" onClick={onCancelEdit} style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}