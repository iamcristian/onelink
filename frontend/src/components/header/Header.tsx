import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LinkIcon, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="z-50 w-full bg-background/95 border-b">
      <div className="flex items-center justify-between h-14">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-lg font-bold flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            OneLink
          </Link>
          {/* <nav className="hidden md:flex space-x-4">
            <Link to="/" className="text-sm">
              Docs
            </Link>
            <Link to="/" className="text-sm">
              Components
            </Link>
            <Link to="/" className="text-sm">
              Themes
            </Link>
          </nav> */}
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-controls="menu-content"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Login and Register buttons */}
          <Button variant="default" asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button variant="ghost" className="hidden sm:inline" asChild>
            <Link to="/auth/register">Register</Link>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="menu-content"
          className="fixed inset-0 top-16 bg-popover p-4 shadow-md md:hidden"
        >
          <nav className="space-y-4">
            <a href="/docs" className="block">
              Docs
            </a>
            <a href="/components" className="block">
              Components
            </a>
            <a href="/themes" className="block">
              Themes
            </a>
            <a href="/auth/login" className="block">
              Login
            </a>
            <a href="/auth/register" className="block">
              Register
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
