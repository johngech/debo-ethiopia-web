import { BaseLayout } from "./BaseLayout";

export const AdminLayout = () => (
  <BaseLayout
    logo="AdminPortal"
    navbar={<AdminActions />}
    sidebar={<AdminMenu />}
    footer={<AdminFooter />}
  />
);

const AdminActions = () => {
  return <h1>Admin</h1>;
};

const AdminMenu = () => {
  return <h1>Admin Menu</h1>;
};

const AdminFooter = () => {
  return <h1>Footer</h1>;
};
