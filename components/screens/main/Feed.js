import React from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { AppConsumer } from "../../Context/MyContext";
import PostCard from "../../components/PostCard";
// import { Posts } from "../../components/data";
import {
  Container,
  PostTime,
  UserImg,
  UserInfo,
  UserInfoText,
  UserName,
} from "../../components/styles/FeedStyles";
import { RESOURCE_URL } from "../../constants/Variables";
export default function Feed({ navigation }) {
  const ListHeader = () => {
    return null;
  };
  return (
    <AppConsumer>
      {(value) => (
        <Container>
          <ScrollView>
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
              ListHeaderComponent={ListHeader}
              ListFooterComponent={ListHeader}
              showsVerticalScrollIndicator={false}
            />

            {/* the place to show suggestions */}
            <FlatList
              data={value.feedPosts.notFolllowingProfiles}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  <UserInfo>
                    <UserImg source={RESOURCE_URL + item.image} />
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
              ListHeaderComponent={ListHeader}
              ListFooterComponent={ListHeader}
              showsVerticalScrollIndicator={false}
            />
            {/* end of suggestions */}
          </ScrollView>
        </Container>
      )}
    </AppConsumer>
  );
}
