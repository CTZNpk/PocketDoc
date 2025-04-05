import React from "react";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

        <div className="space-y-8 max-w-3xl mx-auto text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              1. Overview
            </h2>
            <p>
              At PocketDoc, your privacy is important to us. This policy
              outlines how we collect, use, and protect your data when you use
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              2. What We Collect
            </h2>
            <p>
              We collect basic information to provide our services, including:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Your name and email address (for login and support)</li>
              <li>Documents you upload for summarization or quiz generation</li>
              <li>Usage data to improve app performance and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              3. How We Use Your Data
            </h2>
            <p>Your data helps us:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>Generate summaries and quizzes tailored to your documents</li>
              <li>Improve our algorithms and services</li>
              <li>Send you relevant notifications and updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              4. Data Security
            </h2>
            <p>
              All document processing is handled securely. We use encryption to
              protect your files in transit and at rest. Your documents are
              never shared or used beyond your intended use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              5. Your Rights
            </h2>
            <p>
              You can request deletion of your data at any time by contacting
              our support. We respect your right to privacy and will act
              promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              6. Third-Party Services
            </h2>
            <p>
              PocketDoc may use third-party services (like analytics or file
              storage) but only with providers that adhere to strong privacy and
              security practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              7. Changes to This Policy
            </h2>
            <p>
              We may occasionally update this policy. You’ll be notified of any
              major changes that affect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              8. Contact Us
            </h2>
            <p>
              Have questions? Reach out to us at{" "}
              <a
                href="mailto:support@pocketdoc.ai"
                className="text-cyan-400 underline"
              >
                support@pocketdoc.ai
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
