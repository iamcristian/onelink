import { NavLink } from "react-router";
import { Link2, User, BarChart3 } from "lucide-react";

export default function NavigationTabs() {
  return (
    <div className="flex bg-zinc-100/80 dark:bg-zinc-800/60 p-1 rounded-lg border border-zinc-200/50 dark:border-zinc-700/30 w-fit">
      <nav className="flex space-x-1">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-150 cursor-pointer ${
              isActive
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs border border-zinc-200/30 dark:border-zinc-800/30"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`
          }
        >
          <Link2 className="h-3.5 w-3.5" />
          <span>Links Editor</span>
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-150 cursor-pointer ${
              isActive
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs border border-zinc-200/30 dark:border-zinc-800/30"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`
          }
        >
          <User className="h-3.5 w-3.5" />
          <span>Edit Profile</span>
        </NavLink>
        <NavLink
          to="/admin/analytics"
          className={({ isActive }) =>
            `flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-150 cursor-pointer ${
              isActive
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs border border-zinc-200/30 dark:border-zinc-800/30"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`
          }
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span>Analytics</span>
        </NavLink>
      </nav>
    </div>
  );
}
