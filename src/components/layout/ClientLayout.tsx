import { Navbar } from "../ui";
import { BaseLayout } from "./BaseLayout";

export const ClientLayout = () => {
  return <BaseLayout navbar={<Navbar />} />;
};
