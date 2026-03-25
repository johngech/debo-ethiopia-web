import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";

export interface SidebarContextType {
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

export const SidebarProvider = ({
  children,
  hasSidebar = false,
}: PropsWithChildren<{ hasSidebar?: boolean }>) => {
  const drawerId = useId();
  // Initialize collapsed on mobile/tablet (less than 1024px)
  const [isCollapsed, setIsCollapsed] = useState(
    typeof window === "undefined" ? false : window.innerWidth < 1024,
  );
  // Initialize hidden on small devices (less than 768px)
  const [isHidden, setIsHidden] = useState(
    typeof window === "undefined" ? false : window.innerWidth < 768,
  );

  const toggleSidebar = useCallback(() => setIsCollapsed((prev) => !prev), []);
  const toggleVisibility = useCallback(() => setIsHidden((prev) => !prev), []);

  const value = useMemo(
    () => ({
      isCollapsed,
      setIsCollapsed,
      toggleSidebar,
      isHidden,
      setIsHidden,
      toggleVisibility,
      drawerId,
      hasSidebar,
    }),
    [
      isCollapsed,
      isHidden,
      drawerId,
      hasSidebar,
      toggleSidebar,
      toggleVisibility,
    ],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
