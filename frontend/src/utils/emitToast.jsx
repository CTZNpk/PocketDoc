import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom toast component with app theme
const CustomToast = ({ text }) => (
  <div className="flex items-center max-w-sm mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-cyan-900 p-4 rounded-xl border border-cyan-800/30 shadow-lg">
    <p className="text-white/90 font-medium text-sm">{text}</p>
  </div>
);

// Toast with app theme
export const emitToast = (text) =>
  toast(<CustomToast text={text} />, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastClassName: "bg-transparent shadow-none p-0",
    bodyClassName: "p-0 m-0",
  });
