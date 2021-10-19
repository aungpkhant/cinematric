import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";

import AppLayout from "@/layouts/AppLayout";
import { getMyMovieList } from "@/services/backend/mediaLists";
import { getMovieDetail } from "@/services/tmdb/movies";
import MediaListSkeleton from "@/components/skeletons/MediaListSkeleton";
import ListMetaData from "@/components/media-lists/ListMetaData";
import MovieListTable from "@/components/media-lists/MovieListTable";
import { LISTING_STATUS_ENUM } from "@/constants/cinematric";
import AuthCheck from "@/components/auth/AuthCheck";

export default function MyMovieListPage() {
  const [listStatus, setListStatus] = useState(null);
  const [listState, setListState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  const handleTabClick = (status) => {
    setListStatus(status);
  };

  // * https://stackoverflow.com/questions/26076511/handling-multiple-catches-in-promise-chain
  const fetchData = useCallback(() => {
    setListState({
      ...listState,
      status: "pending",
      error: null,
    });
    getMyMovieList(listStatus == null ? {} : { status: listStatus })
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
  }, [listStatus]);

  useEffect(fetchData, [fetchData]);

  return (
    <AppLayout
      title={
        <Heading as="h2" size="lg">
          My Movie List
        </Heading>
      }
    >
      <AuthCheck>
        <Box>
          <Tabs colorScheme="blue">
            <TabList>
              <Tab onClick={() => handleTabClick(null)}>All</Tab>
              {Object.values(LISTING_STATUS_ENUM).map((statusObj) => (
                <Tab
                  key={statusObj.value}
                  onClick={() => handleTabClick(statusObj.value)}
                >
                  {statusObj.text}
                </Tab>
              ))}
            </TabList>
            <Box pt={5}>
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
              {listState.status === "error" && (
                <Alert status="error">
                  <AlertIcon />
                  Something went wrong. Try refreshing.
                </Alert>
              )}
            </Box>
          </Tabs>
        </Box>
      </AuthCheck>
    </AppLayout>
  );
}
