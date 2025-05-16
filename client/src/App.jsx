import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/HomePage.jsx';
import Login from './pages/LoginPage.jsx';
import Register from './pages/RegisterPage.jsx';
import Profile from './pages/ProfilePage.jsx';
import Dashboard from './pages/DashboardPage.jsx';

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 20 }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'underline' : 'none',
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/login"
          style={({ isActive }) => ({
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'underline' : 'none',
          })}
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          style={({ isActive }) => ({
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'underline' : 'none',
          })}
        >
          Register
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
