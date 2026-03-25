import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "../../context/SidebarProvider";
import { mergeClassName } from "../ui";

interface BaseLayoutProps {
  navbar?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const BaseLayout = (props: BaseLayoutProps) => {
  return (
    <SidebarProvider hasSidebar={!!props.sidebar}>
      <BaseLayoutContent {...props} />
    </SidebarProvider>
  );
};

const BaseLayoutContent = ({
  navbar,
  sidebar,
  footer,
  className,
}: BaseLayoutProps) => {
  const { isCollapsed, isHidden, drawerId } = useSidebar();

  return (
    <div className="flex flex-col h-screen bg-base-200 overflow-hidden">
      <div className="sticky top-0 z-50 w-full flex-none">{navbar}</div>
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
          <main className={mergeClassName("p-4 md:p-8 grow w-full", className)}>
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
  );
};
