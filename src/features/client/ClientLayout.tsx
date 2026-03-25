import { BaseLayout } from "../../components/layout/BaseLayout";
import { Navbar } from "../../components/ui";

export const ClientLayout = () => {
  return <BaseLayout navbar={<Navbar />} />;
};
