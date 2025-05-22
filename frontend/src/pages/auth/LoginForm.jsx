import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeIcon, EyeOffIcon, MailIcon } from "lucide-react";
import FormContainer from "@/components/FormContainer";
import InputField from "@/components/InputField";
import ThemeButton from "@/components/Button";
import useAuth from "@/hooks/useAuth";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSignIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const navigate = useNavigate();

  const navigateToLanding = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await handleSignIn(formData);
      if (response) {
        if (response.role == "user") {
          navigateToLanding();
        } else {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormContainer
      title="Welcome Back"
      subtitle="Sign in to continue your journey"
      footer={
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="h-px bg-gray-700 w-full"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="h-px bg-gray-700 w-full"></div>
          </div>

          <p className="text-sm text-gray-400 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-400 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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

        <ThemeButton
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full py-3 mt-2"
        >
          Login
        </ThemeButton>
      </form>
    </FormContainer>
  );
}
