import { Heading } from "@chakra-ui/react";

import AppLayout from "@/layouts/AppLayout";

export default function DashboardPage() {
  return (
    <AppLayout
      title={
        <Heading as="h2" size="lg">
          Dashboard
        </Heading>
      }
    ></AppLayout>
  );
}
