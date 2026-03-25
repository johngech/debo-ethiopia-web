import { AdminMenu } from "../ui/AdminMenu";
import { Sidebar } from "../ui/Sidebar";
import { BaseLayout } from "./BaseLayout";
import ClientNavbar from "./ClientNavbar";

export const AdminLayout = () => {
  return (
    <BaseLayout
      navbar={<ClientNavbar />}
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
