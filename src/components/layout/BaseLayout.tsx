import { type ReactNode, useId } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Outlet } from "react-router-dom";
import { mergeClassName } from "../ui";

interface BaseLayoutProps {
  navbar?: ReactNode; // Desktop right-side content
  mobileNavbar?: ReactNode; // Mobile right-side content
  sidebar?: ReactNode; // Sidebar menu items
  footer?: ReactNode; // Footer content
  logo?: ReactNode; // Brand element
  className?: string; // Custom classes for main content
  showSidebar?: boolean; // Toggle sidebar visibility logic
}

export const BaseLayout = ({
  navbar,
  mobileNavbar,
  sidebar,
  footer,
  logo = "My App",
  className,
  showSidebar = !!sidebar,
}: BaseLayoutProps) => {
  const drawerId = useId();

  return (
    <div
      className={mergeClassName(
        "drawer min-h-screen bg-base-200 antialiased",
        showSidebar && "lg:drawer-open",
      )}
    >
      <input id={drawerId} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-w-0">
        <header className="navbar w-full bg-base-100 border-b border-base-300 px-4 sticky top-0 z-30 gap-2">
          {/* Navbar Start: Toggles & Mobile Logo */}
          <div className="navbar-start w-auto lg:flex-1">
            {showSidebar && (
              <label
                htmlFor={drawerId}
                className="btn btn-ghost btn-square lg:hidden mr-2"
                aria-label="open sidebar"
              >
                <HiOutlineMenuAlt2 size={24} />
              </label>
            )}

            {/* Logo: Visible on Mobile, or on Desktop if no sidebar */}
            <div
              className={mergeClassName(
                "font-bold text-xl transition-all",
                showSidebar ? "lg:hidden" : "block",
              )}
            >
              {logo}
            </div>
          </div>

          {/* Navbar Center: Great for Search bars or Breadcrumbs */}
          <div className="navbar-center hidden lg:flex">
            {/* Optional: We can add a 'centerContent' prop here later if needed */}
          </div>

          {/* Navbar End: Configurable actions per device */}
          <div className="navbar-end flex-1 justify-end gap-2">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">{navbar}</div>

            {/* Externally Configured Mobile Actions */}
            <div className="flex md:hidden items-center gap-1">
              {mobileNavbar}
            </div>
          </div>
        </header>

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
