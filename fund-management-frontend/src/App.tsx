// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import InvestorsPage from './components/InvestorsPage';
import RegulatoryPage from './components/RegulatoryPage';
import MarketDataPage from './components/MarketDataPage';
import { Navigation } from './components/Navigation';
import { AuthProvider } from './contexts/AuthContext';
import UserInfoPage from './components/UserInfoPage';
import LoginPage from './components/LoginPage';
import  "./App.css";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
} from 'ag-grid-community';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
]);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/regulatory" element={<RegulatoryPage />} />
          <Route path="/market-data" element={<MarketDataPage />} />
          <Route path="/user-info" element={<UserInfoPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>      
    </AuthProvider>
  );
};

export default App;
