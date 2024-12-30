import { Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import LandingPage from './components/landing/LandingPage';
import Contact from './components/contact/Contact'
import MyDocumentsPage from './components/documents/MyDocumentsPage';
import DocumentViewer from './components/documents/DocumentViewer';
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="myDocuments" element={<MyDocumentsPage />} />
        <Route path="documentViewer" element={<DocumentViewer />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes >
      <ToastContainer />
    </>
  );
}

export default App;

