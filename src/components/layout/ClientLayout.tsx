import { HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import { Link, ThemeSwitch } from "../ui";
import { BaseLayout } from "./BaseLayout";
import { Navbar } from "./Navbar";

export const ClientLayout = () => {
  return (
    <BaseLayout
      logo="Debo"
      navbar={<MyDashboardNavbar />}
      sidebar={<h1>Sidebar</h1>}
    />
  );
};

// Example of a Dashboard Navbar configuration
const MyDashboardNavbar = () => (
  <Navbar
    startContent={
      <span className="font-bold text-lg hidden lg:block">Dashboard</span>
    }
    centerContent={
      <>
        <Link to="/" icon={<HiOutlineHome />}>
          Home
        </Link>
        <Link to="/users" icon={<HiOutlineUser />}>
          Users
        </Link>
      </>
    }
    endContent={
      <div className="flex items-center gap-2">
        {/*Profile dropdown or notification component goes here */}
        <ThemeSwitch />
      </div>
    }
  />
);
