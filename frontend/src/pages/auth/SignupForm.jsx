import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon, EyeIcon, EyeOffIcon, MailIcon } from "lucide-react";
import FormContainer from "@/components/FormContainer";
import InputField from "@/components/InputField";
import ThemeButton from "@/components/Button";
import useAuth from "@/hooks/useAuth";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { handleSignUp } = useAuth();
  const navigate = useNavigate();

  const navigateToLanding = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear password error when typing
    if (id === "password" || id === "confirmPassword") {
      setPasswordError("");
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...signupData } = formData;
      await handleSignUp(signupData);
      navigateToLanding();
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormContainer
      title="Create an Account"
      footer={
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="h-px bg-gray-700 w-full"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="h-px bg-gray-700 w-full"></div>
          </div>

          <p className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          id="username"
          label="Full Name"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="John Doe"
          icon={<UserIcon size={18} className="text-gray-400" />}
          required
        />

        <InputField
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          icon={<MailIcon size={18} className="text-gray-400" />}
          required
        />

        <InputField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={passwordError}
          required
          endIcon={
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="focus:outline-none text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          }
        />

        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          error={passwordError}
          required
        />

        <div className="flex items-center mt-2">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-800"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
            I agree to the{" "}
            <Link to="/terms" className="text-cyan-400 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-cyan-400 hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <ThemeButton
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full py-3 mt-2"
        >
          Create Account
        </ThemeButton>
      </form>
    </FormContainer>
  );
}
