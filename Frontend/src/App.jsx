import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Login and Register are in the pages folder
import Login from "./pages/Login";
import Register from "./pages/Register";
// Dashboard is in the components folder!
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Your three main pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;