import { BaseLayout } from "@/components/layout";
import { Navbar, Sidebar } from "@/components/ui";
import { AdminMenu } from "./_components";

export const AdminLayout = () => {
  return (
    <BaseLayout
      navbar={<Navbar />}
      sidebar={
        <Sidebar>
          <AdminMenu />
        </Sidebar>
      }
    />
  );
};
