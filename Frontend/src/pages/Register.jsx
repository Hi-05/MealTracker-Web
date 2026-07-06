import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://mealtracker-web-production.up.railway.app/register", { username, password });
      alert("Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration Failed! Username might already be taken.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h2>📝 Create Account</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input
          type="text"
          placeholder="Choose Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{padding: '10px'}}
        />
        <input
          type="password"
          placeholder="Choose Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{padding: '10px'}}
        />
        <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
          Register
        </button>
      </form>
      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}