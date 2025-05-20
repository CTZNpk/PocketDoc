import React from "react";
import {
  Github,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-gray-900"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-800/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 mx-auto w-full max-w-screen-xl p-6 py-12 lg:py-16">
        {/* Top Section with Newsletter */}
        <div className="mb-12 p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-800 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Stay in the loop
              </h3>
              <p className="text-gray-300">
                Get the latest updates and news from PocketDoc
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent outline-none text-white w-full sm:w-64"
              />
              <Button className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="md:flex md:justify-between">
          {/* Brand Section */}
          <div className="mb-10 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="PocketDoc Logo" className="h-8 mr-3 mb-5" />
              <span className="self-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 mb-5">
                PocketDoc
              </span>
            </Link>

            <p>
              Your AI-powered document assistant for summarizing, querying, and
              creating interactive learning materials.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialLink icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink icon={<Github size={18} />} label="GitHub" />
              <SocialLink icon={<Instagram size={18} />} label="Instagram" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-2">
            <FooterLinkGroup
              title="Product"
              links={[
                { name: "Services", href: "/services" },
                { name: "Pricing", href: "/pricing" },
                { name: "Updates", href: "/updates" },
              ]}
            />

            <FooterLinkGroup
              title="Company"
              links={[
                { name: "About", href: "/about" },
                { name: "Privacy", href: "/privacy" },
                { name: "Terms", href: "/terms" },
              ]}
            />
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400">
            © {currentYear}{" "}
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              PocketDoc
            </Link>
            . All Rights Reserved.
          </span>

          {/* Bottom Links */}
          <div className="flex flex-wrap gap-4 mt-4 sm:mt-0 text-sm text-gray-400">
            <Link
              to="/privacy"
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer >
  );
}

function FooterLinkGroup({ title, links }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
        {title}
      </h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <button
              onClick={() => navigate(link.href)}
              className="text-left w-full text-gray-400 hover:text-cyan-400 transition-colors flex items-center group bg-transparent border-none p-0 m-0"
            >
              {link.name}
              <ExternalLink
                size={14}
                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ icon, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors"
    >
      {icon}
      <span className="sr-only">{label}</span>
    </a>
  );
}
