import React, { useState, useRef } from "react";
import {
  Flex,
  Image,
  IconButton,
  Tag,
  Tr,
  Td,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import NextLink from "next/link";

import { formatDateTimeToHumanReadable } from "@/utils/functions";
import { LISTING_STATUS_ENUM } from "@/constants/cinematric";
import { TMDB_POSTER_SIZES, TMDB_IMG_BASE_URL } from "@/constants/tmdb";

const TvRow = ({
  id,
  listingId,
  listingStatus,
  listingUpdatedAt,
  listingRemark,
  title,
  poster_path,
  overview,
  handleDeleteIconClicked,
  handleEditIconClicked,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleSeeMoreClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Tr>
        <Td>
          <Image
            src={`${TMDB_IMG_BASE_URL}/${TMDB_POSTER_SIZES.w342}${poster_path}`}
            htmlWidth={342}
            htmlHeight={513}
            maxHeight="120px"
            w="auto"
            h="auto"
          />
        </Td>
        <Td color="blue.100">
          <Link as={NextLink} href={`/tv/${id}`}>
            {title}
          </Link>
        </Td>
        <Td>
          <Tag colorScheme="blue">
            {LISTING_STATUS_ENUM[listingStatus].text}
          </Tag>
        </Td>
        <Td color="gray.400">
          {formatDateTimeToHumanReadable(listingUpdatedAt)}
        </Td>
        <Td>
          <Flex>
            <IconButton
              variant="ghost"
              colorScheme="green"
              icon={<FaEdit />}
              onClick={() => {
                handleEditIconClicked(
                  title,
                  listingId,
                  listingStatus,
                  listingRemark
                );
              }}
            />
            <IconButton
              variant="ghost"
              colorScheme="red"
              icon={<FaTrash />}
              onClick={() => {
                handleDeleteIconClicked(title, listingId);
              }}
            />
            <IconButton
              variant="ghost"
              colorScheme="blue"
              icon={expanded ? <FaChevronUp /> : <FaChevronDown />}
              onClick={handleSeeMoreClick}
            />
          </Flex>
        </Td>
      </Tr>
      {expanded && (
        <>
          <Tr color="gray.400">
            <Td colSpan={1}>
              <Text>Overview</Text>
            </Td>
            <Td colSpan={4}>
              <Text whiteSpace="pre-line">{overview}</Text>
            </Td>
          </Tr>
          <Tr color="gray.400">
            <Td colSpan={1}>
              <Text>Remark</Text>
            </Td>
            <Td colSpan={4}>
              <Text whiteSpace="pre-line">{listingRemark}</Text>
            </Td>
          </Tr>
        </>
      )}
    </>
  );
};

export default TvRow;
