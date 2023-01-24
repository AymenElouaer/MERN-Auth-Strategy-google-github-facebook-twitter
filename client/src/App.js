import React from 'react';
import './App.css';
import LoginForm from './components/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Success from './components/success';
import GitSuccess from './components/GitSuccess'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/githubSuccess" element={<GitSuccess />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
