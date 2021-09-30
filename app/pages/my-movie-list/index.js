import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

import AppLayout from "@/layouts/AppLayout";

export default function MyMovieListPage() {
  return (
    <AppLayout
      title={
        <Heading as="h2" size="lg">
          My Movie List
        </Heading>
      }
    >
      <Text mb={4} color="gray.400">
        Updated 20/4/2021 at 9:23PM{" "}
      </Text>
      <Tabs colorScheme="blue">
        <TabList>
          <Tab>All</Tab>
          <Tab>Watching</Tab>
          <Tab>Plan to Watch</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <Text mb={4} color="gray.400">
              33 listings
            </Text>
            <Table variant="simple">
              <TableCaption>
                <Text mb={4} color="gray.400">
                  Showing 1 to 20 out of 33 listings
                </Text>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Movie Title</Th>
                  <Th>Status</Th>
                  <Th>Updated At</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>25.4</Td>
                  <Td>25.4</Td>
                  <Td>25.4</Td>
                </Tr>
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
}
