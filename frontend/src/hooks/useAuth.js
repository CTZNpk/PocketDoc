import { signIn, signUp } from '../api/authService';
import userStore from '../store/userStore';
import { emitToast } from '../utils/emitToast';

const useAuth = () => {
  const { setUser, clearUser } = userStore()
  const handleSignIn = async (formData) => {
    try {
      const data = await signIn(formData);
      localStorage.setItem('token', data.token);
      setUser({ username: data.username });
      emitToast("Sign in Successful");
    } catch (error) {
      emitToast(`Error Signing In: ${error.response.data.error}`);
    }
  };

  const handleSignUp = async (formData) => {
    try {
      const data = await signUp(formData);
      console.log(data)
      localStorage.setItem('token', data.token);
      setUser({ username: data.username });
      emitToast("Sign up Successful");
    } catch (error) {
      console.log(error)
      emitToast(`Error Signing Up: ${error.response.data.error}`);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      clearUser();
    } catch (error) {
    }
  }

  return { handleSignIn, handleSignUp, handleLogout };
};

export default useAuth
