import React, { useContext, useEffect, useState } from "react";
// import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RESOURCE_URL } from "../constants/Variables";
import {
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
  Container,
} from "../components/styles/FeedStyles";

import { TouchableOpacity } from "react-native-gesture-handler";

const PostCard = ({ item }) => {
  // likeIcon = item.liked ? "heart" : "heart-outline";
  let likeIcon = item.liked ? "heart" : "heart-outline";
  let likeIconColor = item.liked ? "#2e64e5" : "#333";
  let likeText = "Like";
  let commentText = "Comment";
  if (item.likes == 1) {
    likeText = "1 Like";
  } else if (item.likes > 1) {
    likeText = item.likes + " Likes";
  } else {
    likeText = "Like";
  }

  if (item.comments == 1) {
    commentText = "1 Comment";
  } else if (item.comments > 1) {
    commentText = item.comments + " Comments";
  } else {
    commentText = "Comment";
  }

  return (
    <Card key={item.id}>
      <UserInfo>
        <UserImg source={RESOURCE_URL + item.img} />
        <UserInfoText>
          <TouchableOpacity onPress={() => {}}>
            <UserName>item.user.name</UserName>
          </TouchableOpacity>
          <PostTime>4 hours</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.caption}</PostText>
      <PostImg source={RESOURCE_URL + item.img} />

      <Container style={{ flexDirection: "row" }}>
        <PostTime style={{ padding: 6 }}>2 Likes</PostTime>
        <PostTime style={{ padding: 6 }}>2 Comments</PostTime>
        <PostTime style={{ padding: 6 }}>2 Shares</PostTime>
      </Container>

      <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {/* {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} />
          </Interaction>
        ) : null} */}
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
