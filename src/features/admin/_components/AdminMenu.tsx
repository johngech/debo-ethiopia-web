import type { IconType } from "react-icons/lib";
import {
  LuLayoutDashboard,
  LuLogOut,
  LuPackage,
  LuSettings,
  LuShieldCheck,
  LuUsers,
} from "react-icons/lu";
import { mergeClassName, SidebarItem } from "@/components/ui";
import { useSidebar } from "@/context";

export const AdminMenu = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex flex-col gap-6 h-full">
      <section className="flex flex-col gap-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.href}
            to={item.href}
            label={item.label}
            icon={<item.Icon />}
          />
        ))}
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

type SidebarItemType = {
  href: string;
  label: string;
  Icon: IconType;
};

const sidebarItems: SidebarItemType[] = [
  { href: "/admin", label: "Dashboard", Icon: LuLayoutDashboard },
  { href: "/admin/users", label: "User Registry", Icon: LuUsers },
  { href: "/admin/products", label: "Inventory", Icon: LuPackage },
  { href: "/admin/roles", label: "Permissions", Icon: LuShieldCheck },
  { href: "/admin/settings", label: "Settings", Icon: LuSettings },
];
