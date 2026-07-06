import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TargetManager from "../components/TargetManager";
import MealForm from "../components/MealForm";
import MealList from "../components/MealList";

export default function Dashboard() {
  const [meals, setMeals] = useState([]);
  const [profile, setProfile] = useState(null); // Stores the user's targets
  const [showTargetManager, setShowTargetManager] = useState(false);
  const navigate = useNavigate();

  // Time Machine Setup
  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const [selectedDate, setSelectedDate] = useState(getTodayString());

  // Fetch data on load
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    // 1. Fetch the user's meals
    axios.get("https://mealtracker-web-production.up.railway.app/meals", config)
      .then(response => setMeals(response.data))
      .catch(error => {
        console.error("Fetch error:", error);
        if (error.response?.status === 401) navigate("/login");
      });

    // 2. Fetch the user's target goals
    axios.get("https://mealtracker-web-production.up.railway.app/profiles/current", config)
      .then(response => setProfile(response.data))
      .catch(error => console.log("No profile found yet. User needs to set targets."));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  // Filter meals for the selected date
  const displayedMeals = meals.filter(meal => meal.date === selectedDate);

  // --- CALCULATION LOGIC ---
  const totalCalories = displayedMeals.reduce((sum, meal) => sum + meal.energy, 0);
  const totalProtein = displayedMeals.reduce((sum, meal) => sum + meal.protein, 0);

  // Helper to calculate the width of the progress bar
  const getProgressWidth = (current, target) => {
    if (!target) return "0%";
    const percentage = Math.min((current / target) * 100, 100); // Cap at 100% so the bar doesn't break out of the box
    return `${percentage}%`;
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>My Meal Tracker</h2>
        <div>
          <button
            onClick={() => setShowTargetManager(!showTargetManager)}
            style={{ marginRight: "10px", padding: "5px 10px", cursor: "pointer" }}>
            ⚙️ Targets
          </button>
          <button
            onClick={handleLogout}
            style={{ background: "black", color: "white", padding: "5px 10px", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </div>

      {/* Target Settings Dropdown */}
      {showTargetManager && (
         <TargetManager
           currentProfile={profile}
           onProfileUpdate={(newProfile) => setProfile(newProfile)} // Instantly updates the bars when saved!
           onClose={() => setShowTargetManager(false)}
         />
      )}

      {/* --- PROGRESS BARS UI --- */}
      {/* --- PROGRESS BARS UI --- */}
            {profile && (
              <div style={{ background: "#2b2b36", color: "white", padding: "20px", borderRadius: "12px", marginBottom: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                <h3 style={{ margin: "0 0 15px 0", borderBottom: "1px solid #444", paddingBottom: "10px" }}>Daily Progress</h3>

                {/* Calories Bar */}
                <div style={{ marginBottom: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px", fontWeight: "bold" }}>
                    <span>🔥 Calories</span>
                    <span>{totalCalories} / {profile.targetEnergy} kcal</span>
                  </div>
                  <div style={{ background: "#444", height: "16px", borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{
                        background: totalCalories > profile.targetEnergy
                          ? "linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)" // Over limit: Red/Orange Gradient
                          : "linear-gradient(90deg, #00b09b 0%, #96c93d 100%)", // Safe: Green/Lime Gradient
                        height: "100%",
                        width: getProgressWidth(totalCalories, profile.targetEnergy),
                        transition: "width 0.5s ease-in-out, background 0.5s ease-in-out"
                      }}>
                    </div>
                  </div>
                </div>

                {/* Protein Bar */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px", fontWeight: "bold" }}>
                    <span>🥩 Protein</span>
                    <span>{totalProtein} / {profile.targetProtein} g</span>
                  </div>
                  <div style={{ background: "#444", height: "16px", borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{
                        background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)", // Cool Blue/Cyan Gradient
                        height: "100%",
                        width: getProgressWidth(totalProtein, profile.targetProtein),
                        transition: "width 0.5s ease-in-out"
                      }}>
                    </div>
                  </div>
                </div>
              </div>
            )}

      {/* Time Machine Controls */}
      <div style={{ margin: "20px 0", padding: "10px", background: "#f8f9fa", borderRadius: "8px" }}>
        <strong>📅 Date: </strong>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        {selectedDate !== getTodayString() && (
          <button onClick={() => setSelectedDate(getTodayString())} style={{ marginLeft: "10px" }}>Jump to Today</button>
        )}
      </div>

      {/* Render the Form ONLY if looking at today */}
      {selectedDate === getTodayString() && (
        <MealForm onMealAdded={(newMeal) => setMeals([...meals, newMeal])} />
      )}

      {/* Render the List */}
      <h3>Meals for {selectedDate}</h3>
      <MealList
        meals={displayedMeals}
        onMealDeleted={(id) => setMeals(meals.filter(meal => meal.id !== id))}
      />
    </div>
  );
}