import { BaseLayout } from "./BaseLayout";
import ClientNavbar from "./ClientNavbar";

export const ClientLayout = () => {
  return <BaseLayout logo="Debo" navbar={<ClientNavbar />} />;
};
