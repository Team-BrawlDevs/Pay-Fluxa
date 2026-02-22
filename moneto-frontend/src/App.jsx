import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import History from "./pages/History";
import Profile from "./pages/Profile";
import RiskLab from "./pages/RiskLab";
import ProtectedRoute from "./context/ProtectedRoute";
import Consent from "./pages/Consent";
import Simulation from "./pages/Simulation";
export default function App() {


  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/assessment"
        element={
          <ProtectedRoute>
            <Assessment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/risk-lab"
        element={
          <ProtectedRoute>
            <RiskLab />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consent"
        element={
          <ProtectedRoute>
            <Consent />
          </ProtectedRoute>
        }
      />
      <Route path="/simulation" element={ <ProtectedRoute><Simulation /></ProtectedRoute>} />
    </Routes>
  );
}
