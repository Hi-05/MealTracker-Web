import axios from "axios";

export default function MealList({ meals, onMealDeleted }) {

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:8080/meals/${id}`, {
        headers: { Authorization: `Bearer ${token}` } // Security stamp!
      });
      onMealDeleted(id); // Tell the Dashboard to remove it from the screen
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  if (meals.length === 0) return <p>No meals logged for this date. Eat something!</p>;

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {meals.map((meal) => (
        <li key={meal.id} style={{ padding: "10px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
          <span><strong>{meal.name}</strong> — {meal.protein}g Protein | {meal.energy} kcal</span>
          <button onClick={() => handleDelete(meal.id)} style={{ background: "red", color: "white", border: "none", cursor: "pointer" }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}