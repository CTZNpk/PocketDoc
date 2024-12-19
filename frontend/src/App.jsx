import './App.css'
import { Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Contact from './components/Contact';
import LoginForm from './components/Login';
import Signup from './components/Signup';
import MyDocumentsPage from './components/MyDocumentsPage';
import DocumentUploadPage from './components/DocumentUploadPage';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/myDocuments" element={<MyDocumentsPage />}></Route>
        <Route path="/documentUpload" element={<DocumentUploadPage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>


    </>
  )
}

export default App
