import React, { useContext, useEffect, useState } from "react";
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
import API from "../constants/API";
import { Image } from "react-native";

import like from "../assets/icons/like.png";
import liked from "../assets/icons/like-1.png";
import save from "../assets/icons/save.png";
import saved from "../assets/icons/save-1.png";
import { DateTime } from "luxon";

const PostCard = ({ item, openComments }) => {
  // likeIcon = item.liked ? "heart" : "heart-outline";
  const [likeCount, setLikeCount] = useState(item.likes_count);
  const [commentCount, setCommentCount] = useState(item.comment_count);
  const [saveCount, setSaveCount] = useState(item.saves_count);
  const [isLiked, setIsLiked] = useState(item.liked_by_auth_user);

  // for the save functionality
  const [isSaved, setIsSaved] = useState(item.saved_by_auth_user);
  let likeIcon = isLiked ? liked : like;
  let saveIcon = isSaved ? saved : save;

  let date1 = DateTime.fromISO(item.created_at).diffNow().as("days");
  // console.log(date1.toFixed());
  // console.log(date1);
  let diff = Math.abs(date1.toFixed());

  const likePressHandler = () => {
    if (isLiked) {
      //first decrease the count if errors happened revert back
      setLikeCount((likeCount) => {
        return parseInt(likeCount) - 1;
      });
      //call to unlike api end point
      API.get("sanctum/csrf-cookie")
        .then(() => {
          API.post("api/posts/" + item.id + "/unlike")
            .then((res) => {
              if (res.status == 200) {
                // this.status = !this.status;
                // this.likes = parseInt(this.likes) - 1;
                console.log("unliked");
              }
            })
            .catch((err) => {
              console.log(err);
              setLikeCount((likeCount) => {
                return parseInt(likeCount) + 1;
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return "failed";
        });
    } else {
      //first increase the count if errors happened revert back
      setLikeCount((likeCount) => {
        return parseInt(likeCount) + 1;
      });
      //call to like api end point
      API.get("sanctum/csrf-cookie")
        .then(() => {
          API.post("api/posts/" + item.id + "/likes")
            .then((res) => {
              if (res.status == 200) {
                console.log("liked");
              }
            })
            .catch((err) => {
              console.log(err);
              setLikeCount((likeCount) => {
                return parseInt(likeCount) - 1;
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return "failed";
        });
    }
    setIsLiked((isLiked) => {
      return !isLiked;
    });
  };
  // End of like press handler

  //start of save press handler
  const savePressHandler = () => {
    if (isSaved) {
      //first decrease the count if errors happened revert back
      setSaveCount((saveCount) => {
        return parseInt(saveCount) - 1;
      });
      //call to unlike api end point
      API.get("sanctum/csrf-cookie")
        .then(() => {
          API.post("api/posts/" + item.id + "/unsave")
            .then((res) => {
              if (res.status == 200) {
                console.log("unsaved");
              }
            })
            .catch((err) => {
              console.log(err);
              setSaveCount((saveCount) => {
                return parseInt(saveCount) + 1;
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return "failed";
        });
    } else {
      //first increase the count if errors happened revert back
      setSaveCount((saveCount) => {
        return parseInt(saveCount) + 1;
      });
      // call to like api end point
      API.get("sanctum/csrf-cookie")
        .then(() => {
          API.post("api/posts/" + item.id + "/save")
            .then((res) => {
              if (res.status == 200) {
                console.log("save");
              }
            })
            .catch((err) => {
              console.log(err);
              setSaveCount((saveCount) => {
                return parseInt(saveCount) - 1;
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return "failed";
        });
    }
    setIsSaved((isSaved) => {
      return !isSaved;
    });
  };
  // End of save press handler

  return (
    <Card key={item.id}>
      <UserInfo>
        <UserImg source={{ uri: RESOURCE_URL + item.user.profile.image }} />
        <UserInfoText>
          <TouchableOpacity onPress={() => {}}>
            <UserName>{item.user.name}</UserName>
          </TouchableOpacity>
          <PostTime>{diff} days ago</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.caption}</PostText>
      <PostImg source={{ uri: RESOURCE_URL + item.img }} />

      <Container style={{ flexDirection: "row" }}>
        <PostTime style={{ padding: 6 }}>{likeCount} Likes</PostTime>
        <PostTime style={{ padding: 6 }}>{commentCount} Comments</PostTime>
        <PostTime style={{ padding: 6 }}>{saveCount} Saves</PostTime>
      </Container>

      <InteractionWrapper style={{ marginBottom: 20 }}>
        <Interaction onPress={likePressHandler}>
          {/* <Ionicons name={likeIcon} size={25} color={likeIconColor} /> */}
          <Image source={likeIcon} style={{ width: 25, height: 25 }} />
          <InteractionText>Like</InteractionText>
        </Interaction>
        <Interaction onPress={() => openComments(item.id)}>
          <Image
            source={require("../assets/icons/comment-1.png")}
            style={{ width: 25, height: 25 }}
          />
          <InteractionText>Comment</InteractionText>
        </Interaction>
        <Interaction onPress={savePressHandler}>
          <Image source={saveIcon} style={{ width: 25, height: 25 }} />
          <InteractionText>Save</InteractionText>
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
