import React from "react";
import Footer from "@/components/Footer";

export default function Updates() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b 
      from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col"
    >
      <main className="flex-grow flex min-h-screen items-center justify-center px-4 py-24 text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Updates</h1>
          <p className="text-gray-400 text-lg">
            No updates yet. Stay tuned for new features and improvements!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
