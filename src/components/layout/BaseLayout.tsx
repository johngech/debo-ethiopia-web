import { type ReactNode, useId } from "react";
import { Outlet } from "react-router-dom";
import { mergeClassName } from "../ui";

interface BaseLayoutProps {
  navbar?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  logo?: ReactNode;
  className?: string;
  showSidebar?: boolean;
}

export const BaseLayout = ({
  navbar,
  sidebar,
  footer,
  logo = "My App",
  className,
  showSidebar = !!sidebar,
}: BaseLayoutProps) => {
  const drawerId = useId();

  /**This is the mobile menu button that needs to be injected into the Navbar
   import { HiOutlineMenuAlt2 } from "react-icons/hi";
    It must be refactored and externalize later
  const MobileToggle = showSidebar ? (
    <label
      htmlFor={drawerId}
      className="btn btn-ghost btn-square lg:hidden"
      aria-label="open sidebar"
    >
      <HiOutlineMenuAlt2 size={24} />
    </label>
  ) : null;
   **/

  return (
    <div
      className={mergeClassName(
        "drawer min-h-screen bg-base-200 antialiased",
        showSidebar && "lg:drawer-open",
      )}
    >
      <input id={drawerId} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-w-0">
        {navbar}

        {/* Content Area */}
        <main className={mergeClassName("p-4 md:p-8 grow w-full", className)}>
          <div className="max-w-400 mx-auto w-full">
            <Outlet />
          </div>
        </main>

        {footer && (
          <footer className="bg-base-100 border-t border-base-300 w-full">
            <div className="max-w-7xl mx-auto">{footer}</div>
          </footer>
        )}
      </div>

      {/* Sidebar Side */}
      {showSidebar && (
        <aside className="drawer-side z-40">
          <label
            htmlFor={drawerId}
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-72 md:w-80 min-h-full bg-base-100 text-base-content border-r border-base-300">
            <div className="px-4 py-6 mb-4 text-2xl font-black text-primary">
              {logo}
            </div>
            <nav className="flex flex-col gap-2">{sidebar}</nav>
          </div>
        </aside>
      )}
    </div>
  );
};
