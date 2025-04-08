import { getUser, logoutUser, signIn, signUp } from "../api/authService";
import userStore from "../store/userStore";
import { emitToast } from "../utils/emitToast";

const useAuth = () => {
  const { setUser, clearUser, user } = userStore();
  const handleSignIn = async (formData) => {
    try {
      const data = await signIn(formData);
      setUser({ username: data.username });
      emitToast("Sign in Successful");
    } catch (error) {
      emitToast(`Error Signing In: ${error.response.data.error}`);
    }
  };

  const handleSignUp = async (formData) => {
    try {
      const data = await signUp(formData);
      setUser({ username: data.username });
      emitToast("Sign up Successful");
    } catch (error) {
      console.log(error);
      emitToast(`Error Signing Up: ${error.response.data.error}`);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    clearUser();
  };

  const fetchUser = async () => {
    try {
      return user;
    } catch (error) {
      console.log(error);
      emitToast(`Error Fetching User: ${error.response.data.error}`);
    }
  };

  return { handleSignIn, handleSignUp, handleLogout, fetchUser };
};

export default useAuth;
