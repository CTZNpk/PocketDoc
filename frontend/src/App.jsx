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
import AboutUsPage from "./pages/about/AboutUsPage";
import PrivacyPolicy from "./pages/privacy/PrivacyPage";
import TermsOfService from "./pages/privacy/TermsOfService";
import Updates from "./pages/privacy/Updates";
import Pricing from "./pages/privacy/Pricing";
import Services from "./pages/services/Services";
import MySummaries from "./pages/documents/MySummary";
import MyQuizScreen from "./pages/quiz/myQuiz";

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
        <Route path="/summary" element={<TextSummarizer />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/summary/:summaryId/" element={<SummaryDisplay />} />
        <Route path="/quiz/:quizId" element={<QuizModule />} />
        <Route path="/mySummaries" element={<MySummaries />} />
        <Route path="/myQuiz" element={<MyQuizScreen />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
