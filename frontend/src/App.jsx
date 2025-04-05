import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import "./index.css";
import LandingPage from "./pages/landing/LandingPage";
import Contact from "./pages/contact/Contact";
import LoginForm from "./pages/auth/LoginForm";
import SignupForm from "./pages/auth/SignupForm";
import TextSummarizer from "./components/TextSummarizer";
import MyDocumentsPage from "./pages/documents/MyDocumentsPage";
import DocumentViewer from "./pages/documents/DocumentViewer";
import SummaryDisplay from "./pages/documents/SummaryDisplayComponents";
import QuizModule from "./pages/quiz/quizPage";

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
        <Route path="/document/:docId/summary" element={<SummaryDisplay />} />
        <Route path="/summary" element={<TextSummarizer />} />
        <Route path="/quiz" element={<QuizModule />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
