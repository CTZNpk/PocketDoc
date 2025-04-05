import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";
// Import shadcn components
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed w-full z-20 top-0 left-0 shadow-lg shadow-black/20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 p-2 rounded-lg">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="self-center text-xl font-bold whitespace-nowrap text-white">
            PocketDoc
          </span>
        </Link>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-800 ${
                      isActive("/") ? "text-cyan-400" : "text-gray-300"
                    }`}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/services" >
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-800 ${
                      isActive("/services") ? "text-cyan-400" : "text-gray-300"
                    }`}
                  >
                    Services
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/myDocuments" >
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-800 ${
                      isActive("/myDocuments")
                        ? "text-cyan-400"
                        : "text-gray-300"
                    }`}
                  >
                    Documents
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" >
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-800 ${
                      isActive("/about") ? "text-cyan-400" : "text-gray-300"
                    }`}
                  >
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" >
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-800 ${
                      isActive("/contact") ? "text-cyan-400" : "text-gray-300"
                    }`}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button
            variant="default"
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white ml-4"
          >
            Login
          </Button>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden w-full mt-4 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <div className="flex flex-col">
              <Link
                to="/"
                className={`py-3 px-4 hover:bg-gray-700 ${
                  isActive("/")
                    ? "text-cyan-400 bg-gray-700/70"
                    : "text-gray-300"
                }`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/services"
                className={`py-3 px-4 hover:bg-gray-700 ${
                  isActive("/services")
                    ? "text-cyan-400 bg-gray-700/70"
                    : "text-gray-300"
                }`}
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link
                to="/myDocuments"
                className={`py-3 px-4 hover:bg-gray-700 ${
                  isActive("/myDocuments")
                    ? "text-cyan-400 bg-gray-700/70"
                    : "text-gray-300"
                }`}
                onClick={toggleMenu}
              >
                Documents
              </Link>
              <Link
                to="/about"
                className={`py-3 px-4 hover:bg-gray-700 ${
                  isActive("/about")
                    ? "text-cyan-400 bg-gray-700/70"
                    : "text-gray-300"
                }`}
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`py-3 px-4 hover:bg-gray-700 ${
                  isActive("/contact")
                    ? "text-cyan-400 bg-gray-700/70"
                    : "text-gray-300"
                }`}
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <div className="py-3 px-4 border-t border-gray-700">
                <Button
                  variant="default"
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                  className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white w-full"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
