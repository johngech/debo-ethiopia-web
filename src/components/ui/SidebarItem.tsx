import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useSidebar } from "../../context";
import { Link, mergeClassName } from "../ui";

interface SidebarItemProps {
  to: string;
  icon: ReactNode;
  label: string;
}

export const SidebarItem = ({ to, icon, label }: SidebarItemProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === to; // Simple check for active state
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={mergeClassName(
        "relative group",
        isCollapsed && "tooltip tooltip-right z-50",
      )}
      data-tip={isCollapsed ? label : undefined}
    >
      <SidebarActiveItemIndicator isActive={isActive} />
      <Link
        to={to}
        icon={icon}
        className={mergeClassName(
          "px-4! py-3! rounded-xl! gap-3!",
          isActive && "font-semibold", // Subtle bolding when active
          isCollapsed && "justify-center px-0!",
        )}
      >
        {!isCollapsed && <span>{label}</span>}
      </Link>
    </div>
  );
};

const SidebarActiveItemIndicator = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;

  return (
    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary z-10 animate-in fade-in slide-in-from-left-1" />
  );
};
