
import { NavLink } from "react-router";

export default function NavigationTabs() {
  return (
    <div className="border-b border-neutral-300 dark:border-neutral-700">
      <nav className="flex space-x-4">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "border-b-2 border-neutral-900 dark:border-neutral-100" : "border-b-2 border-transparent"
          }
        >
          Links
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-neutral-900 dark:border-neutral-100" : "border-b-2 border-transparent"
          }
        >
          My profile
        </NavLink>
      </nav>
    </div>
  );
}
