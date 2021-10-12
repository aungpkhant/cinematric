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
import { useCallback, useState, useEffect } from "react";

import AppLayout from "@/layouts/AppLayout";
import { getMyMovieList } from "@/services/backend/mediaLists";
import { getMovieDetail } from "@/services/tmdb/movies";
import MediaListSkeleton from "@/components/skeletons/MediaListSkeleton";
import ListMetaData from "@/components/media-lists/ListMetaData";
import MovieRow from "@/components/media-lists/MovieRow";

export default function MyMovieListPage() {
  const [listState, setListState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  // ! todo test tmdb error
  // ! todo test cinematric error
  useEffect(() => {
    setListState({
      ...listState,
      status: "pending",
      error: null,
    });
    getMyMovieList()
      .then(
        (res) => {
          return res.data;
        },
        (err) => {
          console.log(err);
          // Handle cinematric backend error
          setListState({
            ...listState,
            status: "error",
            error: err,
          });
        }
      )
      .then(
        (listData) => {
          // Fetch movie data from tmdb using ids from list
          const movieIds = listData.items.map(({ media_id }) => media_id);
          Promise.all(movieIds.map((id) => getMovieDetail(id))).then(
            (movieDetailsRes) => {
              // Attach movie details to list item
              movieDetailsRes.forEach((detailsRes, index) => {
                listData.items[index].item = detailsRes.data;
              });
              setListState({
                ...listState,
                data: listData,
                status: "success",
                error: null,
              });
            }
          );
        },
        (err) => {
          // Handle tmdb error
          setListState({
            ...listState,
            status: "error",
            error: err,
          });
        }
      );
  }, []);

  console.log(listState.data);

  return (
    <AppLayout
      title={
        <Heading as="h2" size="lg">
          My Movie List
        </Heading>
      }
    >
      {listState.status === "pending" && <MediaListSkeleton />}
      {listState.status === "success" && (
        <>
          <ListMetaData updatedAt={listState.data.updated_at} />
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
                  {listState.data.count} listings
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
                    {listState.data.items.map((listing) => (
                      <MovieRow {...listing.item} />
                    ))}
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
        </>
      )}
    </AppLayout>
  );
}
