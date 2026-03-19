import { LuMoon, LuSun } from "react-icons/lu";

const ThemeSwitch = () => {
  return (
    <label className="btn btn-ghost btn-circle swap swap-rotate">
      <input type="checkbox" className="theme-controller" value="dracula" />
      <LuSun className="swap-off h-6 w-6" />
      <LuMoon className="swap-on h-6 w-6" />
    </label>
  );
};

export default ThemeSwitch;
