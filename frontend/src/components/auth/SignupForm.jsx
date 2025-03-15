import React, { useState } from "react";
import FormContainer from "./FormContainer";
import InputField from "../shared/InputField";
import Button from "../shared/Button";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { handleSignUp } = useAuth();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(formData);
  };

  return (
    <FormContainer
      title="Create an Account"
      footer={
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Log in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit}>
        <InputField
          id="username"
          label="Name"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your name"
        />
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
        <Button type="submit" variant="secondary">
          SignUp
        </Button>
      </form>
    </FormContainer>
  );
}
