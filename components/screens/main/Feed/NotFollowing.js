import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import API from "../../../constants/API";

import { RESOURCE_URL } from "../../../constants/Variables";

const NotFollowing = (nfp) => {
  const RenderItem = ({ item }) => {
    // console.log(item);
    const [isFollowed, setIsFollowed] = useState(false);
    let followText = isFollowed ? "Unfollow" : "Follow";

    const handleFollowPress = (id) => {
      setIsFollowed((isFollowed) => !isFollowed);
      // console.log(id);
      API.post("api/follow/" + id)
        .then((res) => {
          console.log(res.data.status);
        })
        .catch((err) => {
          console.log(err);
          setIsFollowed((isFollowed) => !isFollowed);
        });
    };

    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={{
              uri:
                RESOURCE_URL + item.image ||
                require("../../../assets/male.png"),
            }}
            style={styles.pic}
          />
        </TouchableOpacity>
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">
              {item.user.name}
            </Text>
            <TouchableOpacity>
              <Text
                style={styles.mblTxt}
                onPress={() => handleFollowPress(item.id)}
              >
                {followText}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.msgContainer}>
            <Text style={styles.msgTxt}>@{item.user.username}</Text>
          </View>
        </View>
      </View>
    );
  };

  const ListHeader = () => {
    return (
      <Text style={{ fontWeight: "bold", margin: 10, fontSize: 16 }}>
        Suggestions For You
      </Text>
    );
  };
  return (
    <FlatList
      data={nfp}
      // renderItem={({ item }) => RenderItem(item)}
      renderItem={({ item }) => <RenderItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={ListHeader}
      // ListFooterComponent={ListHeader}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: "200",
    color: "blue",
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgTxt: {
    fontWeight: "400",
    color: "gray",
    fontSize: 12,
    marginLeft: 15,
  },
});

export default NotFollowing;
