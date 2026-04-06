// src/components/MealList.jsx
export default function MealList({ meals, onDelete, onEdit }) {
  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ marginTop: 0 }}>Database Log</h2>
      
      {meals.length === 0 ? (
        <p>No meals logged yet...</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {meals.map(meal => (
            <li key={meal.id} style={{ borderBottom: '1px solid #ddd', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <div>
                <strong style={{ fontSize: '18px' }}>{meal.name}</strong> <br/>
                <span style={{ color: '#555' }}>
                  {meal.energy && `⚡ ${meal.energy} kcal | `} 
                  🍗 {meal.protein}g protein 
                  {meal.date && ` | 📅 ${meal.date}`}
                </span>
              </div>

              {/* The New Button Block */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => onEdit(meal)}
                  style={{ backgroundColor: '#ffc107', color: '#000', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(meal.id)}
                  style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Delete
                </button>
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}