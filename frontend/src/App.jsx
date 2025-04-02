import { Routes, Route } from "react-router";
import SignupForm from "./components/auth/SignupForm";
import LoginForm from "./components/auth/LoginForm";
import LandingPage from "./components/landing/LandingPage";
import Contact from "./components/contact/Contact";
import MyDocumentsPage from "./components/documents/MyDocumentsPage";
import DocumentViewer from "./components/documents/DocumentViewer";
import { ToastContainer } from "react-toastify";
import DocumentToc from "./components/documents/DocumentToc";
import "./index.css";
import SummaryDisplay from "./components/documents/SummaryDisplayComponents";
import TextSummarizer from "./components/TextSummarizer";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="myDocuments" element={<MyDocumentsPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/document/:docId" element={<DocumentViewer />} />
        <Route path="/document/:docId/toc" element={<DocumentToc />} />
        <Route path="/document/:docId/summary" element={<SummaryDisplay />} />
        <Route path="/document/:docId/summary" element={<SummaryDisplay />} />
        <Route path="/summary" element={<TextSummarizer />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
