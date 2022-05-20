import React, { useEffect, useState, Fragment as Fr } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Box,
  Text,
  Image,
  useColorModeValue,
  GridItem as Gi,
  Icon,
} from "@chakra-ui/react";
import {
  fetchAllPost,
  likeItem,
  unlikeItem,
  commentPost,
  textToImage,
} from "../store/post";
import CommentModal from "./CommentModal";
import { MdVerified } from "react-icons/md";
import SocialPostComments from "./SocialPostComments";
import {
  FaRegComment,
  FaRegShareSquare,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useAddress } from "@thirdweb-dev/react";
import { fetchUser } from "../store/userSlice";
import Addpost from "./Addpost";
import Link from "next/link";

export const SocialCard = (props) => {
  const address = useAddress();
  const { user: walletUser } = useSelector((state) => state.user);
  const { AllPost: post, status } = useSelector((state) => state.socialPost);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [viewComment, setViewComment] = useState(false);
  const dispatch = useDispatch();
  const borderClr = useColorModeValue("gray.300", "gray.600");
  useEffect(() => {
    if (status != "success") {
      dispatch(fetchAllPost());
    }
  }, [status, dispatch]);

  const unlikePost = (id, e) => {
    e.target.hidden = true;
    const unlikePostData = {
      postId: id,
      userId: walletUser.id,
      type: "post",
    };
    dispatch(unlikeItem(unlikePostData));
  };
  const unlikeComment = (id, e) => {
    e.target.hidden = true;
    const unlikePostData = {
      commentId: id,
      userId: walletUser.id,
      type: "comment",
    };
    dispatch(unlikeItem(unlikePostData));
  };
  const lPost = (id, e) => {
    e.target.hidden = true;
    const lPostData = {
      postId: id,
      userId: walletUser.id,
      type: "post",
    };
    dispatch(likeItem(lPostData));
  };
  const lComment = (id, e) => {
    e.target.hidden = true;
    const lCommentData = {
      commentId: id,
      userId: walletUser.id,
      type: "comment",
    };
    dispatch(likeItem(lCommentData));
  };
  const addComment = (postId, userId, comment) => {
    const newComment = {
      content: comment,
      likes: 0,
      postId: postId,
      userId: userId,
    };
    dispatch(commentPost(newComment));
    closeModal();
  };
  const openModal = (data) => {
    setOpen(true);
    setData(data);
  };
  const closeModal = () => {
    setOpen(false);
    setData({});
  };
  const alertToLogin = () => {
    alert("Please Log In with your wallet!");
  };
  let tempPost = [];
  if (!!post) {
    tempPost = [...post];
  }
  return (
    <Box display="flex" flexDirection="column" align="center" gap="4">
      {/* {!!address ? 'wallet connected ':'wallet not connected '} */}
      {!!walletUser.username ? "" : "Not logged in viewing as a guest"}
      {!!walletUser.username ? <Addpost /> : null}
      <CommentModal
        open={open}
        closeFunc={closeModal}
        data={data}
        addComment={addComment}
      />
      {!!post
        ? tempPost.map((singlePostData) => {
            const {
              id,
              postImage,
              imageUrl,
              content,
              comments,
              user,
              contentUri,
              likes_posts,
            } = singlePostData;
            let tempComments = [...comments];

            return (
              <Box
                alignContent="center"
                margin="10px"
                borderRadius="lg"
                display="flex"
                flexDirection="column"
                maxW="xl"
                key={id}
                boxShadow={"md"}
                border="1px solid"
                borderColor={borderClr}
              >
                <Link key={user.username} href={`/${user.username}`} passHref>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="1"
                    p="2"
                    cursor="pointer"
                  >
                    <Image
                      padding="2px"
                      margin="2px"
                      borderRadius="full"
                      boxSize="50px"
                      alt=""
                      src={user.imageUrl}
                    />
                    <Box>{user.username}</Box>
                    <Icon fill="cyan.500" as={MdVerified} />
                  </Box>
                </Link>
                {postImage ? (
                  <Box>
                    <Image src={imageUrl} alt="" width="100%" />
                  </Box>
                ) : (
                  <Box>
                    <Image src={contentUri} bg="white" alt="" />
                  </Box>
                )}

                {!!walletUser.username ? (
                  <Fr>
                    <Box display="flex" px="4" gap="0.85rem" mt="3" mb="2">
                      {likes_posts.filter(
                        (like) => like.userId === walletUser.id
                      ).length > 0 ? (
                        <Icon
                          h={6}
                          w={6}
                          as={FaHeart}
                          cursor="pointer"
                          fill="red"
                          onClick={(e) => {
                            unlikePost(id, e);
                          }}
                        />
                      ) : (
                        <Icon
                          h={6}
                          w={6}
                          as={FaRegHeart}
                          cursor="pointer"
                          onClick={(e) => lPost(id, e)}
                        />
                      )}

                      <Icon
                        h={6}
                        w={6}
                        as={FaRegComment}
                        cursor="pointer"
                        onClick={() => {
                          openModal(singlePostData);
                        }}
                        value={id}
                      />
                      <Icon
                        h={6}
                        w={6}
                        cursor="pointer"
                        as={FaRegShareSquare}
                      />
                    </Box>
                    <Box
                      alignSelf="start"
                      pt="1"
                      px="4"
                      pb={postImage ? "0" : "1"}
                    >
                      <Text as="span" fontWeight="bold">
                        {likes_posts.length}
                      </Text>{" "}
                      likes
                    </Box>
                  </Fr>
                ) : (
                  <Fr>
                    <Box display="flex" px="4" gap="0.85rem" mt="3" mb="2">
                      <Icon
                        as={FaRegHeart}
                        h={6}
                        w={6}
                        onClick={(e) => {
                          alertToLogin();
                        }}
                      />
                      <Icon
                        as={FaRegComment}
                        h={6}
                        w={6}
                        onClick={() => {
                          alertToLogin();
                        }}
                        value={id}
                      />
                      <Icon as={FaRegShareSquare} h={6} w={6} />
                    </Box>
                    <Box
                      alignSelf="start"
                      pt="1"
                      px="4"
                      pb={postImage ? "0" : "1"}
                    >
                      <Text as="span" fontWeight="bold">
                        {likes_posts.length}
                      </Text>{" "}
                      likes
                    </Box>
                  </Fr>
                )}
                {postImage ? (
                  <Box display="flex" pt="1" px="4" pb="1">
                    <Text>
                      <Text as="span" fontWeight="bold">
                        {user.username}{" "}
                      </Text>
                      {content}
                    </Text>
                  </Box>
                ) : null}
                <SocialPostComments
                  tempComments={tempComments}
                  walletUser={walletUser}
                  alertToLogin={alertToLogin}
                  lComment={lComment}
                  unlikeComment={unlikeComment}
                />
              </Box>
            );
          })
        : "There are no post"}
    </Box>
  );
};

export default SocialCard;
