import './App.css';
import { Routes, Route } from "react-router";
import Navbar from './components/Navbar';

import Contact from './components/Contact';
import MyDocumentsPage from './components/MyDocumentsPage';
import DocumentUploadPage from './components/DocumentUploadPage';
import Documents from './components/Documents';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import LandingPage from './components/landing/LandingPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="myDocuments" element={<MyDocumentsPage />} />
        <Route path="docs" element={<DocumentUploadPage />} />
        <Route path="blog" element={<Documents />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </>
  );
}

export default App;

