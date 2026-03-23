import {
  LuChevronDown,
  LuGithub,
  LuMenu,
  LuSearch,
  LuUser,
} from "react-icons/lu";
import { Link, NavItem, NavUnderline } from "../ui";
import { Navbar } from "./Navbar";

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
    label: "Tutorials",
    link: "/tutorials",
    children: [
      { label: "React", link: "/tutorials/react" },
      { label: "Tailwind", link: "/tutorials/tailwind" },
    ],
  },
  { label: "About", link: "/about" },
];

const ClientNavbar = () => {
  return (
    <Navbar
      startContent={
        <>
          {/* Mobile Dropdown Trigger */}
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-ghost hover:bg-primary/5 lg:hidden px-2"
            >
              <LuMenu className="text-xl" />
            </button>
            <ul className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-300">
              {NavLinks}
            </ul>
          </div>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content font-black">
              D
            </div>
            <span className="hidden sm:inline-block text-xl font-bold tracking-tight">
              Daisy<span className="text-primary">Dev</span>
            </span>
          </Link>
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

          {/* Other Links */}
          <a
            href="https://github.com"
            target="_blank"
            className="btn btn-ghost btn-circle btn-sm"
            rel="noopener"
          >
            <LuGithub className="text-lg" />
          </a>

          {/* Profile/CTA */}
          <div className="divider divider-horizontal mx-1 hidden sm:flex h-6 self-center"></div>
          <button
            type="button"
            className="btn btn-primary btn-sm px-4 rounded-full"
          >
            <LuUser className="text-lg mr-1" />
            <span className="hidden sm:inline">Sign In</span>
          </button>
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

export default ClientNavbar;
