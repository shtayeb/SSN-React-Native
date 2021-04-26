import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// import { Entypo } from "@expo/vector-icons";
// import { PROFILE_RESOURCE, RESOURCE_URL } from "../../constants/Variables";
import { AppConsumer } from "../../Context/MyContext";
import { AppContext } from "../../Context/MyContext";
// import PostCard from "../../components/PostCard";
import ExploreCard from "../../components/ExploreCard";

export default function Profile({ navigation }) {
  const [collectionSelected, setCollectionSelected] = useState(true);
  const contextValue = React.useContext(AppContext);
  const Data = contextValue["getProfile"];
  // const profileNew = contextValue["profile"];

  useEffect(() => {
    Data();
  }, []);

  const onTabPressed = () => {
    setCollectionSelected(!collectionSelected);
  };

  const ListHeader = (stats, profile) => {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.userImg}
          source={{
            uri: stats.profileImage
              ? "http://192.168.43.12" + stats.profileImage ||
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
              : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
          }}
        />
        <Text style={styles.userName}>{profile.title}</Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}></Text>
        <View style={styles.userBtnWrapper}>
          {/* {route.params ? ( */}
          {/* <> */}
          <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
            <Text style={styles.userBtnTxt}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
            <Text style={styles.userBtnTxt}>Follow</Text>
          </TouchableOpacity>
          {/* </> */}
          {/* ) : ( */}
          {/* <> */}
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <Text style={styles.userBtnTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
            <Text style={styles.userBtnTxt}>Logout</Text>
          </TouchableOpacity>
          {/* </> */}
          {/* )} */}
        </View>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{stats.postCount}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{stats.followersCount}</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{stats.followingsCount}</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <AppConsumer>
      {({ profile, stats, posts }) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          {posts && (
            <ExploreCard data={posts} ListHeader={ListHeader(stats, profile)} />
          )}
        </SafeAreaView>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
