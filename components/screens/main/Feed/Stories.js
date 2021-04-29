import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { UserImg } from "../../../components/styles/FeedStyles";

export default function Stories(stories) {
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
          <UserImg source={require("../../../assets/images/1.jpg")} />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true}
      // ListHeaderComponent={ListHeader}
      // ListFooterComponent={ListHeader}
      // showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({});
