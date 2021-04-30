import React, { useRef, useMemo, useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  SafeAreaView,
} from "react-native";
import { AppConsumer } from "../../../Context/MyContext";
import PostCard from "../../../components/PostCard";
import { Container } from "../../../components/styles/FeedStyles";
import NotFollowing from "./NotFollowing";
import Stories from "./Stories";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import API from "../../../constants/API";
import { RESOURCE_URL } from "../../../constants/Variables";
import { TextInput } from "react-native-gesture-handler";
export default function Feed({ navigation }) {
  const [calls, setCalls] = useState(null);
  const [cBody, setCBody] = useState(null);
  const [postId, setPostId] = useState(null);

  // ref
  const bottomSheetModalRef = useRef(null);
  // variables
  // const data = useMemo(calls);
  // const data = useMemo(() => calls, []);
  const snapPoints = useMemo(() => ["0%", "50%", "90%"], []);
  //callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index === -1) {
      console.log("Cleaned");
      setCalls(null);
      handleDismiss();
    }
  }, []);
  const handlePresentModalPress = useCallback((id) => {
    bottomSheetModalRef.current?.present();
    console.log(id);

    //call the api for data of post comments
    //set it to a state variable
    API.get("api/posts/" + id + "/show")
      .then((res) => {
        console.log(res.data);
        setCalls(() => res.data);
        // console.log(calls);
      })
      .catch((err) => {
        console.log("not the response");
        console.log(err);
        return "failed";
      });
    setPostId(id);
  }, []);

  const handleDismiss = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image
            source={{ uri: RESOURCE_URL + item.image }}
            style={styles.pic}
          />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
              <Text style={styles.mblTxt}>{item.posted_at}</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.cbody}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
    []
  );

  const handleCommentAddPress = (user) => {
    // the API endPoint is posts/{post}/comment
    // we have PostId in the state
    console.log(postId);
    API.post("api/posts/" + postId + "/comment", { cbody: cBody })
      .then((res) => {
        console.log(res.data);
        // console.log(calls);
      })
      .catch((err) => {
        console.log("not the response");
        console.log(err);
        return "failed";
      });
    // console.log(cBody);
    const newComment = {
      id: Math.random(),
      cbody: cBody,
      image: user.image,
      title: user.title,
      posted_at: "Just Now",
    };
    setCalls([...calls, newComment]);
    setCBody("");
  };
  return (
    <AppConsumer>
      {(value) => (
        <Container>
          <SafeAreaView>
            <FlatList
              data={value.feedPosts.posts}
              renderItem={({ item }) => (
                <PostCard
                  openComments={handlePresentModalPress}
                  item={item}
                  onDelete={() => {}}
                  onPress={() =>
                    navigation.navigate("Profile", { userId: item.userId })
                  }
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={Stories(value.feedPosts.stories)}
              ListFooterComponent={() =>
                NotFollowing(value.feedPosts.notFolllowingProfiles)
              }
              showsVerticalScrollIndicator={false}
            />
            {/* the bottom sheet */}
            <BottomSheetModalProvider>
              <View style={styles.container}>
                <BottomSheetModal
                  ref={bottomSheetModalRef}
                  index={1}
                  snapPoints={snapPoints}
                  onChange={handleSheetChanges}
                >
                  <BottomSheetFlatList
                    data={calls}
                    keyExtractor={(item) => {
                      return item.id.toString();
                    }}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainer}
                  />
                  {/* the comment box */}
                  <View style={styles.formContent}>
                    <TouchableOpacity>
                      <Image
                        style={[
                          styles.icon,
                          styles.inputIcon,
                          styles.backButton,
                        ]}
                        source={require("../../../assets/al.png")}
                        onPress={() => handleDismiss}
                      />
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                      <Image
                        style={[styles.icon, styles.inputIcon]}
                        source={require("../../../assets/icons/comment-1.png")}
                      />
                      <TextInput
                        style={styles.inputs}
                        labelValue={cBody}
                        onChangeText={(body) => {
                          setCBody(body);
                        }}
                        placeholder="Enter Your Comment Here !"
                        underlineColorAndroid="transparent"
                        multiline={true}
                        numberOfLines={4}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => handleCommentAddPress(value.user)}
                    >
                      <Image
                        style={[
                          styles.icon,
                          styles.inputIcon,
                          styles.menuButton,
                        ]}
                        source={require("../../../assets/icons/plus.png")}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* End of the comment box */}
                </BottomSheetModal>
              </View>
            </BottomSheetModalProvider>
            {/* the bottom sheet */}
          </SafeAreaView>
        </Container>
      )}
    </AppConsumer>
  );
}

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
    width: 40,
    height: 40,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "bold",
    color: "#222",
    fontSize: 14,
    width: 170,
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgTxt: {
    fontWeight: "400",
    color: "black",
    fontSize: 12,
    marginLeft: 15,
  },
  formContent: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 1,
    alignItems: "center",
  },
  inputContainer: {
    // borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    // borderBottomWidth: 1,
    borderWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 2,
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 8,
    justifyContent: "center",
  },
  icon: {
    width: 35,
    height: 35,
  },
  icon: {
    height: 25,
    width: 25,
  },
  backButton: {
    marginRight: 10,
  },
  menuButton: {
    marginRight: 15,
  },
  inputs: {
    height: 60,
    flex: 1,
  },
});
