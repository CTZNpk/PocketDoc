import { toast } from "react-toastify";

export const emitToast = (text) => toast(text, {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
});
