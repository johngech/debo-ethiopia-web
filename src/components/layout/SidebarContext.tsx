import { createContext, useContext } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  toggleSidebar: () => void;
  isHidden: boolean;
  setIsHidden: (value: boolean) => void;
  toggleVisibility: () => void;
  drawerId: string;
  hasSidebar: boolean;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
