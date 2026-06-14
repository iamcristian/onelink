import { Link, useNavigate } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { useState, useRef, useEffect } from "react";
import { LinkIcon, LogOut, ChevronDown, UserCircle } from "lucide-react";

const AdminHeader = () => {
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/");
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-zinc-950/85 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo Branding */}
        <div className="flex items-center space-x-2">
          <Link to="/admin" className="text-md font-black flex items-center gap-1.5 text-zinc-900 dark:text-white tracking-tight hover:opacity-90">
            <LinkIcon className="h-4.5 w-4.5 text-blue-600 dark:text-blue-500" />
            <span>OneLink</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-md">
              Admin
            </span>
          </Link>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* User profile dropdown button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleMenu}
              className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-150 cursor-pointer"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt="User profile"
                  className="h-7 w-7 rounded-full object-cover ring-2 ring-blue-500/10 shadow-xs"
                />
              ) : (
                <div className="h-7 w-7 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center font-bold text-sm">
                  {user.handle.charAt(0).toUpperCase()}
                </div>
              )}
              <ChevronDown className={`h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu styling */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-1.5 z-50 text-zinc-900 dark:text-zinc-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-xs font-black tracking-tight">@{user.handle}</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-1">
                    {user.email}
                  </div>
                </div>
                
                <div className="border-t border-zinc-100 dark:border-zinc-850 my-1" />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-bold rounded-lg cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
