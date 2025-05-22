import { getUser, logoutUser, signIn, signUp } from "../api/authService";
import userStore from "../store/userStore";
import { emitToast } from "../utils/emitToast";

const useAuth = () => {
  const { setUser, clearUser, user } = userStore();
  const handleSignIn = async (formData) => {
    try {
      const data = await signIn(formData);
      setUser({
        username: data.user.username,
        email: data.user.email,
        role: data.user.role ?? "user",
      });
      emitToast("Sign in Successful");
      return data.user;
    } catch (error) {
      emitToast(`Error Signing In: ${error.response.data.error}`);
    }
  };

  const handleSignUp = async (formData) => {
    try {
      const data = await signUp(formData);
      setUser({
        username: data.user.username,
        email: data.user.email,
        role: data.user.role ?? "user",
      });
      emitToast("Sign up Successful");
      return data.user;
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
