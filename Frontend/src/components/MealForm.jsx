import { useState } from "react";
import axios from "axios";

export default function MealForm({ onMealAdded }) {
  const [name, setName] = useState("");
  const [protein, setProtein] = useState("");
  const [energy, setEnergy] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post("http://localhost:8080/meals", {
          name,
          protein: parseInt(protein),
          energy: parseInt(energy)
        }, {
        headers: { Authorization: `Bearer ${token}` } // Security stamp!
      });

      onMealAdded(response.data); // Tell the Dashboard a new meal was added!
      setName(""); setProtein(""); setEnergy(""); // Clear the form
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Log a New Meal</h3>
      <input type="text" placeholder="Meal Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ marginRight: "10px" }} />
      <input type="number" placeholder="Protein (g)" value={protein} onChange={(e) => setProtein(e.target.value)} required style={{ marginRight: "10px", width: "80px" }} />
      <input type="number" placeholder="Calories" value={energy} onChange={(e) => setEnergy(e.target.value)} required style={{ marginRight: "10px", width: "80px" }} />
      <button type="submit">Add Meal</button>
    </form>
  );
}