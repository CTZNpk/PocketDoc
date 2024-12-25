import './App.css'
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
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<LandingPage />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path='/checkFileRender' element={<Documents />}
        />
        <Route path="/myDocuments" element={<MyDocumentsPage />}></Route>
        <Route path="/documentUpload" element={<DocumentUploadPage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/signup" element={<SignupForm />}></Route>
      </Routes>


    </>
  )
}

export default App
