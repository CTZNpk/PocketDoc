import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navbar />
      <div className="container mx-auto py-16 px-4 mt-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white">Contact PocketDoc</h1>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Have questions or feedback? Reach out — we're here to help you learn
            smarter.
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-gray-800/60 px-4 py-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="bg-gray-800/60 px-4 py-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-gray-800/60 px-4 py-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-gray-800/60 px-4 py-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full bg-gray-800/60 px-4 py-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none"
              />
              <Button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400">
                Send Message
              </Button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-cyan-400" /> Our Location
                </h3>
                <p className="ml-7">
                  PUCIT-New Campus F7J8+53W
                  <br /> Samsani Road, Quaid-i-Azam Campus
                  <br /> Lahore, Pakistan 123 Innovation Drive
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <Phone className="h-5 w-5 text-cyan-400" /> Phone
                </h3>
                <p className="ml-7">
                  +92 3337403442
                  <br />
                  Mon–Fri: 9am–6pm
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <Mail className="h-5 w-5 text-cyan-400" /> Email
                </h3>
                <p className="ml-7">support@pocketdoc.ai</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Connect With Us
                </h3>
                <div className="flex space-x-4 ml-1">
                  <a href="#" className="hover:text-cyan-400">
                    <Facebook />
                  </a>
                  <a href="#" className="hover:text-cyan-400">
                    <Twitter />
                  </a>
                  <a href="#" className="hover:text-cyan-400">
                    <Instagram />
                  </a>
                  <a href="#" className="hover:text-cyan-400">
                    <Linkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
          <a
            href="https://www.google.com/maps/place/PUCIT-New+Campus/@31.4804787,74.2626187,17z/data=!3m1!4b1!4m6!3m5!1s0x391903ccac08143b:0x9b0637753efd261e!8m2!3d31.4804787!4d74.265199!16s%2Fg%2F11cjqdpj0_?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/map_location.png"
              alt="Our location on the map"
              className="w-full h-92 object-cover rounded-lg hover:opacity-90 transition-opacity"
            />
          </a>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-gray-800/40 p-4 rounded-md">
              <summary className="font-medium text-white cursor-pointer">
                What file types does PocketDoc support?
              </summary>
              <p className="text-gray-400 mt-2">
                PocketDoc supports PDFs, DOCX, PPTX, and plain text files. You
                can also provide URLs for web pages to summarize and quiz.
              </p>
            </details>

            <details className="bg-gray-800/40 p-4 rounded-md">
              <summary className="font-medium text-white cursor-pointer">
                How are quizzes generated from my document?
              </summary>
              <p className="text-gray-400 mt-2">
                Our AI analyzes your content for key ideas, then generates
                multiple-choice, true/false, and short answer questions to
                reinforce understanding.
              </p>
            </details>

            <details className="bg-gray-800/40 p-4 rounded-md">
              <summary className="font-medium text-white cursor-pointer">
                Can I customize the types of questions?
              </summary>
              <p className="text-gray-400 mt-2">
                Yes! You can choose which types of questions you'd like, adjust
                difficulty, and even focus on specific topics within your
                document.
              </p>
            </details>

            <details className="bg-gray-800/40 p-4 rounded-md">
              <summary className="font-medium text-white cursor-pointer">
                Is PocketDoc free to use?
              </summary>
              <p className="text-gray-400 mt-2">
                PocketDoc offers a free tier with core features, and premium
                plans for power users and educators with advanced analytics and
                batch processing.
              </p>
            </details>

            <details className="bg-gray-800/40 p-4 rounded-md">
              <summary className="font-medium text-white cursor-pointer">
                Will my documents remain private?
              </summary>
              <p className="text-gray-400 mt-2">
                Absolutely. Your documents are processed securely and never
                shared. You always retain full ownership and control.
              </p>
            </details>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
