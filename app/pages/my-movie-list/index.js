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
import StatusSelect from "@/components/media-lists/StatusSelect";

export default function MyMovieListPage() {
  const [listStatus, setListStatus] = useState("all");
  const [listState, setListState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  const handleTabClick = (status) => {
    setListStatus(status);
  };

  const handleStatusSelect = (e) => {
    setListStatus(e.target.value);
  };

  // * https://stackoverflow.com/questions/26076511/handling-multiple-catches-in-promise-chain
  const fetchData = useCallback(() => {
    setListState({
      ...listState,
      status: "pending",
      error: null,
    });
    getMyMovieList(listStatus === "all" ? {} : { status: listStatus })
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
          <Tabs colorScheme="blue" display={["none", "none", "initial"]}>
            <TabList>
              <Tab onClick={() => handleTabClick("all")}>All</Tab>
              {Object.values(LISTING_STATUS_ENUM).map((statusObj) => (
                <Tab
                  key={statusObj.value}
                  onClick={() => handleTabClick(statusObj.value)}
                >
                  {statusObj.text}
                </Tab>
              ))}
            </TabList>
          </Tabs>

          <StatusSelect
            value={listStatus}
            onChange={handleStatusSelect}
            display={["initial", "initial", "none"]}
          />

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
        </Box>
      </AuthCheck>
    </AppLayout>
  );
}
