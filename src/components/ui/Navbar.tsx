import { LuChevronDown, LuMenu, LuPanelLeft, LuSearch } from "react-icons/lu";
import { useMe } from "@/hooks";
import { useSidebar } from "../../context";
import { NavbarLayout } from "../layout/NavbarLayout";
import { Link } from "./Link";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import { NavUnderline } from "./NavUnderline";
import ThemeSwitch from "./ThemeSwitch";

const navItems = [
  { label: "Home", link: "/home" },
  { label: "Service", link: "/service" },
  {
    label: "Projects",
    link: "/projects",
    children: [
      { label: "Web Apps", link: "/projects/web" },
      { label: "Mobile", link: "/projects/mobile" },
    ],
  },
  {
    label: "Media",
    link: "/media",
    children: [
      { label: "News", link: "/media/news" },
      { label: "Blog", link: "/media/blog" },
    ],
  },
  {
    label: "Tutorials",
    link: "/tutorials",
    children: [
      { label: "React", link: "/tutorials/react" },
      { label: "Tailwind", link: "/tutorials/tailwind" },
    ],
  },
  { label: "About", link: "/about" },
];

const Navbar = () => {
  const { hasSidebar, toggleVisibility } = useSidebar();
  const { data: user } = useMe();
  const isAuthenticated = !!user;

  return (
    <NavbarLayout
      startContent={
        <>
          {/* Mobile Sidebar Toggle (if sidebar exists) */}
          {hasSidebar && (
            <button
              type="button"
              onClick={toggleVisibility}
              className="btn btn-ghost hover:bg-primary/5 px-2 cursor-pointer"
            >
              <LuPanelLeft className="text-xl" />
            </button>
          )}

          {/* Mobile Menu Dropdown (NavLinks) */}
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-ghost hover:bg-primary/5 lg:hidden px-2"
            >
              <LuMenu className="text-xl" />
            </button>
            <ul className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-300">
              {NavLinks}
            </ul>
          </div>

          {/* Brand Logo */}

          <Logo src="/src/assets/logo.png" />
        </>
      }
      centerContent={
        <ul className="menu menu-horizontal px-1 font-medium gap-1">
          {NavLinks}
        </ul>
      }
      endContent={
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Replace with search component */}
          <button
            type="button"
            className="btn btn-ghost btn-circle btn-sm hidden md:flex"
          >
            <LuSearch className="text-lg" />
          </button>
          <ThemeSwitch />

          {/* Other Links */}
          {isAuthenticated && user?.role === "SUPER_ADMIN" && (
            <NavItem>
              <Link
                to="/admin"
                className="bg-transparent! shadow-none px-0 py-0"
              >
                Admin
                <NavUnderline />
              </Link>
            </NavItem>
          )}

          {/* Profile/CTA */}
          {!isAuthenticated && (
            <>
              <div className="divider divider-horizontal mx-1 hidden sm:flex h-6 self-center"></div>
              <Link
                to={"/auth"}
                className="btn btn-primary btn-sm px-4 rounded-full"
              >
                Login
              </Link>
            </>
          )}
        </div>
      }
    />
  );
};

// Shared link list to keep desktop and mobile in sync

const NavLinks = (
  <>
    {navItems.map((item) => {
      if (item.children) {
        return (
          <li key={item.link} className="dropdown dropdown-hover group">
            <button
              type="button"
              className="relative flex items-center gap-1 px-3 py-2 text-sm font-medium text-base-content/70 hover:text-primary transition-colors cursor-default border-none bg-transparent"
            >
              {item.label}
              <LuChevronDown className="text-xs transition-transform group-hover:rotate-180" />
              <NavUnderline />
            </button>

            <ul className="dropdown-content z-50 menu p-2 shadow-2xl bg-base-100 rounded-box w-52 border border-base-300 mt-0 pt-2">
              <div className="bg-base-100 rounded-box overflow-hidden">
                {item.children.map((child) => (
                  <li key={child.link}>
                    <Link to={child.link}>{child.label}</Link>
                  </li>
                ))}
              </div>
            </ul>
          </li>
        );
      }

      return (
        <NavItem key={item.link}>
          <Link
            to={item.link}
            className="bg-transparent! shadow-none px-0 py-0"
          >
            {item.label}
            <NavUnderline />
          </Link>
        </NavItem>
      );
    })}
  </>
);

export default Navbar;
