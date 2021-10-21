import { Heading, Center, Text } from "@chakra-ui/react";

import AppLayout from "@/layouts/AppLayout";

export default function DashboardPage() {
  return (
    <AppLayout
      title={
        <Heading as="h2" size="lg">
          Dashboard
        </Heading>
      }
    >
      <Center h="200px" bg="elevation.200" color="gray.400" borderRadius={6}>
        <Text>-- Coming Soon --</Text>
      </Center>
    </AppLayout>
  );
}
