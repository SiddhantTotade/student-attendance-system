import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/base_components/NavBar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />} />
      </Routes>
    </Router>
  );
}

export default App;
