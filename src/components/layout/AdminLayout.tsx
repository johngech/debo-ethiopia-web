import { Navbar, Sidebar } from "../ui";
import { AdminMenu } from "../ui/AdminMenu";
import { BaseLayout } from "./BaseLayout";

export const AdminLayout = () => {
  return (
    <BaseLayout
      navbar={<Navbar />}
      sidebar={
        <Sidebar>
          <AdminMenu />
        </Sidebar>
      }
      footer={<AdminFooter />}
    />
  );
};

const AdminFooter = () => {
  return <h1>Footer</h1>;
};
