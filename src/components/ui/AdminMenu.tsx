import {
  LuLayoutDashboard,
  LuLogOut,
  LuPackage,
  LuSettings,
  LuShieldCheck,
  LuUsers,
} from "react-icons/lu";
import { useSidebar } from "../../context";
import { mergeClassName } from "./mergeClassName";
import { SidebarItem } from "./SidebarItem";

export const AdminMenu = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Group 1: Management */}
      <section className="flex flex-col gap-1">
        {!isCollapsed && (
          <header className="px-4 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">
              Management
            </span>
          </header>
        )}
        <SidebarItem
          to="/admin"
          icon={<LuLayoutDashboard color="red" />}
          label="Dashboard"
        />
        <SidebarItem
          to="/admin/users"
          icon={<LuUsers />}
          label="User Registry"
        />
        <SidebarItem
          to="/admin/products"
          icon={<LuPackage />}
          label="Inventory"
        />
      </section>

      {/* Group 2: Security & Settings */}
      <section className="flex flex-col gap-1">
        {!isCollapsed && (
          <header className="px-4 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">
              System
            </span>
          </header>
        )}
        <SidebarItem
          to="/admin/roles"
          icon={<LuShieldCheck />}
          label="Permissions"
        />
        <SidebarItem
          to="/admin/settings"
          icon={<LuSettings />}
          label="Settings"
        />
      </section>

      {/* Bottom Action */}
      <div className="mt-auto border-t border-base-300 pt-4">
        <div
          className={mergeClassName(
            "relative group",
            isCollapsed && "tooltip tooltip-right z-50",
          )}
          data-tip={isCollapsed ? "Sign Out" : undefined}
        >
          <button
            type="button"
            className={mergeClassName(
              "flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-error hover:bg-error/10 rounded-xl transition-all duration-200",
              isCollapsed && "justify-center px-0!",
            )}
          >
            <LuLogOut className="text-xl" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
