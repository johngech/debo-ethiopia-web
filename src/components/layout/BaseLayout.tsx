import { type ReactNode, useCallback, useId, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { mergeClassName } from "../ui";
import { SidebarContext } from "./SidebarContext";

interface BaseLayoutProps {
  navbar?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const BaseLayout = ({
  navbar,
  sidebar,
  footer,
  className,
}: BaseLayoutProps) => {
  const drawerId = useId();
  // Initialize collapsed on mobile/tablet (less than 1024px)
  const [isCollapsed, setIsCollapsed] = useState(
    globalThis.window === undefined ? false : window.innerWidth < 1024,
  );
  // Initialize hidden on small devices (less than 768px)
  const [isHidden, setIsHidden] = useState(
    globalThis.window === undefined ? false : window.innerWidth < 768,
  );

  const toggleSidebar = useCallback(() => setIsCollapsed((prev) => !prev), []);
  const toggleVisibility = useCallback(() => setIsHidden((prev) => !prev), []);

  const contextValue = useMemo(
    () => ({
      isCollapsed,
      setIsCollapsed,
      toggleSidebar,
      isHidden,
      setIsHidden,
      toggleVisibility,
      drawerId,
      hasSidebar: !!sidebar,
    }),
    [isCollapsed, isHidden, drawerId, sidebar, toggleSidebar, toggleVisibility],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div className="flex flex-col h-screen bg-base-200 overflow-hidden">
        {/* 1. Navbar stays outside the drawer to remain full-width and unpushed */}
        <header className="sticky top-0 z-50 w-full flex-none">{navbar}</header>
        <div
          className={mergeClassName(
            "drawer flex-1 overflow-hidden antialiased transition-all duration-300",
            sidebar && !isHidden && "drawer-open",
          )}
          style={{
            ["--drawer-width" as string]: isCollapsed ? "5rem" : "20rem",
          }}
        >
          <input id={drawerId} type="checkbox" className="drawer-toggle" />

          {/* Content Area */}
          <div className="drawer-content flex flex-col min-w-0 overflow-y-auto overflow-x-hidden">
            <main
              className={mergeClassName("p-4 md:p-8 grow w-full", className)}
            >
              <div className="max-w-400 mx-auto w-full">
                <Outlet />
              </div>
            </main>

            {footer && (
              <footer className="bg-base-100 border-t border-base-300 w-full flex-none">
                <div className="max-w-7xl mx-auto">{footer}</div>
              </footer>
            )}
          </div>

          {/* Sidebar Side */}
          {sidebar}
        </div>
      </div>
    </SidebarContext.Provider>
  );
};
