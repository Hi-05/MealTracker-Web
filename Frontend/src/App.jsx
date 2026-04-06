// src/App.jsx
import { useState, useEffect } from 'react';
import MealForm from './components/MealForm';
import MealList from './components/MealList';
import Dashboard from './components/Dashboard';
import TargetManager from './components/TargetManager'; // Import the new component!

function App() {
  const [meals, setMeals] = useState([]);
  const [profile, setProfile] = useState(null);
  const [editingMeal, setEditingMeal] = useState(null);
  
  // --- NEW FEATURES STATE ---
  const [showTargetManager, setShowTargetManager] = useState(false);
  
  // Safely get today's date in YYYY-MM-DD format for our Time Machine
  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const [selectedDate, setSelectedDate] = useState(getTodayString());

  useEffect(() => {
    fetch('http://localhost:8080/meals')
      .then(res => res.json())
      .then(data => setMeals(data));
    
    fetch('http://localhost:8080/profiles/current')
      .then(res => { if (res.ok) return res.json(); throw new Error('No profile'); })
      .then(data => setProfile(data))
      .catch(err => console.log("Profile error:", err));
  }, []);

  // --- CRUD ACTIONS ---
  const handleMealAdded = (newMeal) => setMeals([...meals, newMeal]);
  
  const handleMealUpdated = (updatedMeal) => {
    setMeals(meals.map(meal => meal.id === updatedMeal.id ? updatedMeal : meal));
    setEditingMeal(null);
  };

  const handleDeleteMeal = (id) => {
    fetch(`http://localhost:8080/meals/${id}`, { method: 'DELETE' })
    .then(() => setMeals(meals.filter(meal => meal.id !== id)));
  };

  // --- THE TIME MACHINE FILTER ---
  // We filter the master 'meals' list so the Dashboard and List ONLY see the selected date!
  const displayedMeals = meals.filter(meal => meal.date === selectedDate);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      
      {/* Header & Controls Menu */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>My Meal Tracker</h1>
        
        <button 
          onClick={() => setShowTargetManager(!showTargetManager)}
          style={{ padding: '8px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          ⚙️ Target Settings
        </button>
      </div>

      {/* Target Manager (Conditionally Rendered) */}
      {showTargetManager && (
        <TargetManager 
          currentProfile={profile} 
          onProfileUpdate={(newProfile) => setProfile(newProfile)} 
          onClose={() => setShowTargetManager(false)} 
        />
      )}

      {/* Time Machine Date Picker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', backgroundColor: '#e9ecef', padding: '10px', borderRadius: '8px' }}>
        <strong style={{ color: '#495057' }}>📅 Viewing Date:</strong>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ced4da' }}
        />
        {selectedDate === getTodayString() ? 
          <span style={{ color: '#198754', fontWeight: 'bold', fontSize: '14px' }}> (Today)</span> : 
          <button onClick={() => setSelectedDate(getTodayString())} style={{ padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>Jump to Today</button>
        }
      </div>
      
      {/* Dashboard now receives ONLY the filtered meals for the selected date! */}
      <Dashboard meals={displayedMeals} profile={profile} />
      
      {/* Only show the Add Meal form if we are looking at Today (to prevent accidental historical logging) */}
      {selectedDate === getTodayString() && (
        <MealForm 
          onMealAdded={handleMealAdded} 
          onMealUpdated={handleMealUpdated}
          editingMeal={editingMeal}
          onCancelEdit={() => setEditingMeal(null)}
        />
      )}
      
      {/* List now receives ONLY the filtered meals for the selected date! */}
      <MealList 
        meals={displayedMeals} 
        onDelete={handleDeleteMeal} 
        onEdit={(meal) => setEditingMeal(meal)} 
      />
      
    </div>
  );
}

export default App;