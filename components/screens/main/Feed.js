import React from "react";
import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import { AppConsumer } from "../../Context/MyContext";
import PostCard from "../../components/PostCard";
// import { Posts } from "../../components/data";
import {
  Container,
  Divider,
  PostTime,
  UserImg,
  UserInfo,
  UserInfoText,
  UserName,
} from "../../components/styles/FeedStyles";
import { RESOURCE_URL } from "../../constants/Variables";
export default function Feed({ navigation }) {
  const ListFooter = (nfp) => {
    return (
      <FlatList
        data={nfp}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row" }}>
            <UserInfo>
              <UserImg
                source={{
                  uri:
                    RESOURCE_URL + item.image ||
                    require("../../assets/male.png"),
                }}
              />
              <UserInfoText>
                <TouchableOpacity onPress={() => {}}>
                  <UserName>{item.user.name}</UserName>
                </TouchableOpacity>
                <PostTime>4 hours</PostTime>
                <UserName>Follow</UserName>
              </UserInfoText>
            </UserInfo>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        // ListHeaderComponent={ListHeader}
        // ListFooterComponent={ListHeader}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  const ListHeader = (stories) => {
    return (
      <FlatList
        data={stories}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 2,
              alignItems: "center",
            }}
          >
            <UserImg source={require("../../assets/images/1.jpg")} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        // ListHeaderComponent={ListHeader}
        // ListFooterComponent={ListHeader}
        // showsVerticalScrollIndicator={false}
      />
    );
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
                  item={item}
                  onDelete={() => {}}
                  onPress={() =>
                    navigation.navigate("Profile", { userId: item.userId })
                  }
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={ListHeader(value.feedPosts.stories)}
              ListFooterComponent={ListFooter(
                value.feedPosts.notFolllowingProfiles
              )}
              showsVerticalScrollIndicator={false}
            />
          </SafeAreaView>
        </Container>
      )}
    </AppConsumer>
  );
}
