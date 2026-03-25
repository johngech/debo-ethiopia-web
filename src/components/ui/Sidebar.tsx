import type { ReactNode } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useSidebar } from "../../context/SidebarProvider";
import { mergeClassName } from "../ui";

interface SidebarProps {
  children: ReactNode;
  className?: string;
}

export const Sidebar = ({ children, className }: SidebarProps) => {
  const { isCollapsed, toggleSidebar, drawerId } = useSidebar();

  return (
    <aside
      className={mergeClassName(
        "drawer-side transition-all duration-300 ease-in-out h-full",
        isCollapsed ? "w-20" : "w-80",
      )}
    >
      {/* Overlay to close drawer on mobile */}
      <label
        htmlFor={drawerId}
        aria-label="close sidebar"
        className="drawer-overlay"
      />

      <div
        className={mergeClassName(
          "menu p-4 min-h-full bg-base-100 text-base-content border-r border-base-300 transition-all duration-300",
          isCollapsed ? "w-20" : "w-80",
          className,
        )}
      >
        <div
          className={mergeClassName(
            "flex items-center mb-4 transition-all duration-300",
            isCollapsed ? "justify-center" : "justify-end",
          )}
        >
          <button
            type="button"
            onClick={toggleSidebar}
            className="btn btn-ghost btn-sm btn-circle"
          >
            {isCollapsed ? (
              <LuChevronRight size={30} />
            ) : (
              <LuChevronLeft size={30} />
            )}
          </button>
        </div>
        <nav className="flex flex-col gap-1">{children}</nav>
      </div>
    </aside>
  );
};
