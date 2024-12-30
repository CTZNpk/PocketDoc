import React, { useState } from "react";
import FormContainer from "./FormContainer";
import Button from "../shared/Button";
import InputField from "../shared/InputField"
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { handleSignIn } = useAuth();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(formData);
  };

  return (
    <FormContainer
      title="Welcome Back"
      footer={
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit}>
        <InputField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <Button type="submit"
          variant="secondary"
        >Login</Button>
      </form>
    </FormContainer>
  );
}

