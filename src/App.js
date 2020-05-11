import React from 'react';
import './App.css';

// Import Components:
import Navbar from './components/Navbar.js'
import Dashboard from './components/Dashboard.js'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
