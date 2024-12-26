import React, { useState } from "react";
import AnimateBox from "./shared/AnimateBox";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);

    // Simulate a successful form submission
    setSubmitted(true);

    // Reset the form after submission
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="mt-10 min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <AnimateBox>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-indigo-400 shadow-lg text-white sm:rounded-3xl sm:p-20">
            {/* Header Section */}
            <div className="text-center pb-6">
              <h1 className="text-3xl font-semibold">Contact Us!</h1>
              <p className="text-gray-300">
                Fill up the form below to send us a message.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 
              text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:border-indigo-500"
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 
              text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 
              focus:border-indigo-500"
                placeholder="Type your message here..."
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              {/* Gradient Buttons */}
              <div className="flex justify-between items-center mt-6 space-x-4">
                {/* Send Button */}
                <div className="relative inline-flex items-center justify-center group">
                  <div className="absolute transition-all duration-300 rounded-full 
                  -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:blur-lg 
                  group-hover:opacity-75"></div>
                  <button
                    type="submit"
                    className="relative inline-flex items-center justify-center px-10 py-3 text-lg 
                  font-semibold text-white bg-black border border-transparent rounded-full 
                  group-hover:bg-gradient-to-r group-hover:from-cyan-500 
                  group-hover:to-purple-500 transition-transform duration-300 transform hover:scale-105"
                    disabled={submitted}
                  >
                    <span className="relative">
                      {submitted ? "✅ Sent!" : "🚀 Send ➤"}
                    </span>
                  </button>
                </div>

                {/* Reset Button */}
                <div className="relative inline-flex items-center justify-center group">
                  <div className="absolute transition-all duration-300 rounded-full -inset-px bg-gradient-to-r from-red-500 to-orange-500 group-hover:blur-lg group-hover:opacity-75"></div>
                  <button
                    type="button"
                    onClick={() => setFormData({ name: "", email: "", subject: "", message: "" })}
                    className="relative inline-flex items-center justify-center px-10 py-3 text-lg font-semibold text-white bg-black border border-transparent rounded-full group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 transition-transform duration-300 transform hover:scale-105"
                  >
                    <span className="relative">🔄 Reset</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </AnimateBox>
    </div>

  );
}
