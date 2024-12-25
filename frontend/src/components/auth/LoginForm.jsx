import React, { useState } from "react";
import axios from "axios";
import FormContainer from "./FormContainer";
import Button from "../shared/Button";
import InputField from "../shared/InputField"

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("Please Sign In");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/pocketdoc/user-auth/signin",
        formData
      );
      localStorage.setItem("token", response.data.token);
      setMessage(`Login successful! Welcome, ${response.data.username}`);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <FormContainer
      title="Welcome Back"
      footer={
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="#" className="text-purple-400 hover:underline">
            Sign up
          </a>
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
      <div className="mt-4 text-white">{message}</div>
    </FormContainer>
  );
}

