import React, { useState, Fragment as Fr } from "react";
import {
  Box,
  Text,
  Grid,
  Divider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
export default function SocialSinglePost({
  tempComments,
  walletUser,
  lComment,
  unlikeComment,
  alertToLogin,
}) {
  const [viewComment, setViewComment] = useState(false);
  const viewColor = useColorModeValue("blackAlpha.600", "gray.500");
  return (
    <Fr>
      <Text
        textAlign="left"
        px={4}
        pb={tempComments.length ? (viewComment ? "1" : "3") : "2"}
        color={viewColor}
        cursor={tempComments.length && "pointer"}
        onClick={() => {
          if (!tempComments.length) return;
          setViewComment((prev) => !prev);
        }}
      >
        {tempComments.length
          ? viewComment
            ? "Hide comments"
            : "View comments"
          : ""}
      </Text>
      <Box maxH="12.5rem" overflowY="scroll">
        {viewComment &&
          tempComments
            .sort((a, b) => {
              return new Date(a.createdAt) > new Date(b.createdAt);
            })
            .map((c) => {
              const { content, user, id, likes_comments } = c;
              const { username } = user;
              return (
                <Box key={id}>
                  <Divider margin="2px" />
                  <Grid templateColumns="1fr max-content" px="4" py="1">
                    <Box align="start" marginLeft="4px" margin="2px">
                      <Text as="span" fontWeight="bold">
                        {username}
                      </Text>
                      : {content}
                    </Box>
                    {!!walletUser.username ? (
                      <Box display="flex" flexDirection="row" margin="3px">
                        <Box
                          marginRight="3px"
                          display="flex"
                          alignItems="center"
                          gap="1"
                        >
                          {!!likes_comments.length && likes_comments.length}
                          {likes_comments.filter(
                            (like) => like.userId === walletUser.id
                          ).length > 0 ? (
                            <Icon
                              as={FaHeart}
                              cursor="pointer"
                              fill="red"
                              onClick={(e) => {
                                unlikeComment(id, e);
                              }}
                            />
                          ) : (
                            <Icon
                              as={FaRegHeart}
                              cursor="pointer"
                              onClick={(e) => lComment(id, e)}
                            />
                          )}
                        </Box>
                      </Box>
                    ) : (
                      <Box display="flex" flexDirection="row" margin="3px">
                        <Box
                          marginRight="3px"
                          display="flex"
                          alignItems="center"
                          gap="1"
                        >
                          {likes_comments.length}
                          <Icon
                            as={FaRegHeart}
                            cursor="pointer"
                            onClick={() => alertToLogin()}
                          />
                        </Box>
                      </Box>
                    )}
                  </Grid>
                </Box>
              );
            })}
      </Box>
    </Fr>
  );
}
