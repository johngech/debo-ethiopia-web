import { ThemeSwitch } from "../ui";
import { BaseLayout } from "./BaseLayout";

export const ClientLayout = () => {
  return (
    <BaseLayout
      logo="Debo"
      navbar={<ClientNavbar />}
      sidebar={<h1>Sidebar</h1>}
      footer={<LargeClientFooter />}
    />
  );
};

const ClientNavbar = () => {
  return (
    <div className="flex justify-between">
      <span>Logo</span>
      <div className="flex">
        <ThemeSwitch />
      </div>
    </div>
  );
};

const LargeClientFooter = () => {
  return <h2>Client Footer</h2>;
};
