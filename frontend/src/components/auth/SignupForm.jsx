import React, { useState } from "react";
import axios from "axios";
import FormContainer from "./FormContainer";
import InputField from "../shared/InputField"
import Button from "../shared/Button";

export default function SignupForm() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("Please Sign Up");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/pocketdoc/user-auth/signup",
        formData
      );
      localStorage.setItem("token", response.data.token);
      setMessage(`Signup successful! Welcome, ${response.data.username}`);
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <FormContainer
      title="Create an Account"
      footer={
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <a href="#" className="text-purple-400 hover:underline">
            Log in
          </a>
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
        <Button type="submit"
          variant="secondary"
        >SignUp</Button>
      </form>
      <div className="mt-4 text-white">{message}</div>
    </FormContainer>
  );
}

