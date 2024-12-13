import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Contact from './components/Contact';
import LoginForm from './components/Login';
import Signup from './components/Signup';

function App() {
  

  return (
    <>
  <Routes>
  <Route path="/" element={<Navbar/>}>
    <Route index element={<Homepage />} />
    <Route path="contact" element={<Contact />} />
  </Route>
  <Route path="/login" element={<LoginForm/>}></Route>
  <Route path="/signup" element={<Signup/>}></Route>
</Routes>

        
    </>
  )
}

export default App
