import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";

import AppLayout from "@/layouts/AppLayout";
import { getMyMovieList } from "@/services/backend/mediaLists";
import { getMovieDetail } from "@/services/tmdb/movies";
import MediaListSkeleton from "@/components/skeletons/MediaListSkeleton";
import ListMetaData from "@/components/media-lists/ListMetaData";
import MovieListTable from "@/components/media-lists/MovieListTable";

export default function MyMovieListPage() {
  const [listState, setListState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  // * https://stackoverflow.com/questions/26076511/handling-multiple-catches-in-promise-chain
  const fetchData = () => {
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
          // Cinematric backend error -- attach error name and pass to final catch
          err.name = "CinematricServerError";
          throw err;
        }
      )
      .then((listData) => {
        // Fetch movie data from tmdb using ids from list
        const movieIds = listData.items.map(({ media_id }) => media_id);
        Promise.all(movieIds.map((id) => getMovieDetail(id))).then(
          (movieDetailsRes) => {
            // Attach movie details to list item
            movieDetailsRes.forEach((detailsRes, index) => {
              listData.items[index].media_item = detailsRes.data;
            });
            setListState({
              ...listState,
              data: listData,
              status: "success",
              error: null,
            });
          }
        );
      })
      .catch((err) => {
        if (err.name === "CinematricServerError") {
          // TODO sentry here
          // Handle cinematric error
          setListState({
            ...listState,
            status: "error",
            error: err,
          });
        } else {
          // Handle all other errors
          setListState({
            ...listState,
            status: "error",
            error: err,
          });
        }
      });
  };

  useEffect(fetchData, []);

  return (
    <AppLayout
      title={
        <Heading as="h2" size="lg">
          My Movie List
        </Heading>
      }
    >
      <Tabs colorScheme="blue">
        <TabList>
          <Tab>All</Tab>
          <Tab>Watching</Tab>
          <Tab>Plan to Watch</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            {listState.status === "pending" && <MediaListSkeleton />}
            {listState.status === "success" && (
              <>
                <ListMetaData
                  count={listState.data.count}
                  updatedAt={listState.data.updated_at}
                />
                <MovieListTable
                  listings={listState.data.items}
                  refresh={fetchData}
                />
              </>
            )}
            {listState.status === "error" && <Text>Something went wrong</Text>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
}
