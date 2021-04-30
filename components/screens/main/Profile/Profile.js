import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// import { Entypo } from "@expo/vector-icons";
// import { PROFILE_RESOURCE, RESOURCE_URL } from "../../constants/Variables";
import { AppConsumer } from "../../../Context/MyContext";
import { AppContext } from "../../../Context/MyContext";
// import PostCard from "../../components/PostCard";
import ExploreCard from "../../../components/ExploreCard";
import Header from "../../../components/Header";
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
      <SafeAreaView>
        <Header
          title={profile.title}
          openDrawer={navigation.openDrawer}
          goBack={navigation.goBack}
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            justifyContent: "center",
            // alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* start of like instagram */}
          <View style={styles.myInsta}>
            <Image
              style={styles.userImg}
              source={{
                uri: stats.profileImage
                  ? "http://192.168.43.12" + stats.profileImage ||
                    "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                  : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
              }}
            />
            <View style={styles.myInstaUserInfoWrapper}>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>{stats.postCount}</Text>
                <Text style={styles.userInfoSubTitle}>Posts</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>{stats.followersCount}</Text>
                <Text style={styles.userInfoSubTitle}>Followers</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>
                  {stats.followingsCount}
                </Text>
                <Text style={styles.userInfoSubTitle}>Following</Text>
              </View>
            </View>
          </View>
          {/* end of like instagram */}

          <View style={{ margin: 10 }}>
            <Text style={styles.userName}>{profile.title}</Text>
            {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
            <Text style={styles.aboutUser}>{profile.desc}</Text>
            <Text
              style={[styles.aboutUser, { marginBottom: 20, color: "#2e64e5" }]}
              onPress={() => Linking.openURL(profile.url)}
            >
              {profile.url}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={[
                styles.userBtn,
                { flex: 1, alignItems: "center", marginBottom: 5 },
              ]}
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              <Text style={styles.userBtnTxt}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userBtnWrapper}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => navigation.navigate("Followings")}
            >
              <Text style={styles.userBtnTxt}>Followings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                navigation.navigate("Followers");
              }}
            >
              <Text style={styles.userBtnTxt}>Followers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
              <Text style={styles.userBtnTxt}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
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
    height: 105,
    width: 105,
    borderRadius: 75,
    margin: 10,
  },
  myInsta: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  myInstaUserInfoWrapper: {
    flexDirection: "row",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    // marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    // textAlign: "center",
  },
  userBtnWrapper: {
    flexDirection: "row",
    // justifyContent: "center",
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
    flex: 1,
    alignItems: "center",
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
    marginHorizontal: 15,
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
