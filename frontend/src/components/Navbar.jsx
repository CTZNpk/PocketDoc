import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useAuth from "@/hooks/useAuth";
import userStore from "@/store/userStore";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { fetchUser, handleLogout } = useAuth();
  const { user } = userStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed w-full z-20 top-0 left-0 shadow-lg shadow-black/20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="PocketDoc Logo" className="h-8 mr-3" />
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
              {[
                { path: "/", label: "Home" },
                { path: "/services", label: "Services" },
                { path: "/myDocuments", label: "Documents" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
                ...(user
                  ? [
                      { path: "/myQuiz", label: "Quizzes" },
                      { path: "/mySummaries", label: "Summaries" },
                    ]
                  : []),
              ].map(({ path, label }) => (
                <NavigationMenuItem key={path}>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-gray-800 ${
                      isActive(path) ? "text-cyan-400" : "text-gray-300"
                    }`}
                  >
                    <Link to={path}>{label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {!user && (
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
          )}
          {user && (
            <Button
              variant="default"
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white w-full"
            >
              LogOut
            </Button>
          )}
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden w-full mt-4 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <div className="flex flex-col">
              {[
                { path: "/", label: "Home" },
                { path: "/services", label: "Services" },
                { path: "/myDocuments", label: "Documents" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
                ...(user
                  ? [
                      { path: "/myQuiz", label: "Quizzes" },
                      { path: "/mySummaries", label: "Summaries" },
                    ]
                  : []),
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`py-3 px-4 hover:bg-gray-700 ${
                    isActive(path)
                      ? "text-cyan-400 bg-gray-700/70"
                      : "text-gray-300"
                  }`}
                  onClick={toggleMenu}
                >
                  {label}
                </Link>
              ))}

              <div className="py-3 px-4 border-t border-gray-700">
                {!user && (
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
                )}
                {user && (
                  <Button
                    variant="default"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white w-full"
                  >
                    LogOut
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
