import React from "react";
import { FlatList } from "react-native";
import { AppConsumer } from "../../../Context/MyContext";
import PostCard from "../../../components/PostCard";
import { Container } from "../../../components/styles/FeedStyles";
import NotFollowing from "./NotFollowing";
import Stories from "./Stories";
export default function Feed({ navigation }) {
  return (
    <AppConsumer>
      {(value) => (
        <Container>
          {/* <SafeAreaView> */}
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
            ListHeaderComponent={Stories(value.feedPosts.stories)}
            ListFooterComponent={() =>
              NotFollowing(value.feedPosts.notFolllowingProfiles)
            }
            showsVerticalScrollIndicator={false}
          />
          {/* </SafeAreaView> */}
        </Container>
      )}
    </AppConsumer>
  );
}
