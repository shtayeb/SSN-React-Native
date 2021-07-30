import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Header from "../../../components/Header";
import API from "../../../constants/API";
import { RESOURCE_URL } from "../../../constants/Variables";

const ProfileListHeader = ({ stats, profile, navigation, logOut, flag }) => {
  // console.log(stats.follows);
  const [isFollowed, setIsFollowed] = useState(stats.follows);
  let followText = isFollowed ? "Unfollow" : "Follow";
  //   let followText = "Follow";
  const handleFollowPress = () => {
    setIsFollowed((isFollowed) => !isFollowed);
    const id = profile.user_id;
    console.log(id);
    API.post("api/follow/" + id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsFollowed((isFollowed) => !isFollowed);
      });
  };
  return (
    <SafeAreaView>
      {flag && (
        <Header
          title={profile.title}
          openDrawer={navigation.openDrawer}
          goBack={navigation.goBack}
        />
      )}

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
                ? RESOURCE_URL + stats.profileImage
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
              <Text style={styles.userInfoTitle}>{stats.followingsCount}</Text>
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

        {/* <View
          style={{
            flexDirection: "row",
          }}
        > */}
        {flag && (
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
        )}
        {/* </View> */}
        <View style={styles.userBtnWrapper}>
          {!flag && (
            <TouchableOpacity
              style={styles.userBtn}
              onPress={handleFollowPress}
            >
              <Text style={styles.userBtnTxt}>{followText}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => navigation.navigate("Followings", { profile })}
          >
            <Text style={styles.userBtnTxt}>Followings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => {
              navigation.navigate("Followers", { profile });
            }}
          >
            <Text style={styles.userBtnTxt}>Followers</Text>
          </TouchableOpacity>
          {flag && (
            <TouchableOpacity style={styles.userBtn} onPress={() => logOut()}>
              <Text style={styles.userBtnTxt}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileListHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 0,
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
