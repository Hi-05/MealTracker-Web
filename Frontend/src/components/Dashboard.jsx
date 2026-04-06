// src/components/Dashboard.jsx
export default function Dashboard({ meals, profile }) {
  
  const totalEnergy = meals.reduce((sum, meal) => sum + meal.energy, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);

  if (!profile) {
    return (
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <p style={{ margin: 0 }}>⚠️ Loading macro targets from database...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#d1e7dd', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0f5132' }}>⚡ Energy (kcal)</h3>
        <p style={{ fontSize: '24px', margin: '0', fontWeight: 'bold', color: '#146c43' }}>
          {totalEnergy} / {profile.targetEnergy}
        </p>
        <small style={{ color: '#0f5132' }}>{profile.targetEnergy - totalEnergy} remaining</small>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0f5132' }}>🍗 Protein (g)</h3>
        <p style={{ fontSize: '24px', margin: '0', fontWeight: 'bold', color: '#146c43' }}>
          {totalProtein} / {profile.targetProtein}
        </p>
        <small style={{ color: '#0f5132' }}>{profile.targetProtein - totalProtein} remaining</small>
      </div>
    </div>
  );
}