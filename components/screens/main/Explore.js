import React, { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import ExploreCard from "../../components/ExploreCard";
import { AppConsumer } from "../../Context/MyContext";
import { AppContext } from "../../Context/MyContext";
import Header from "../../components/Header";
export default function Explore({ navigation }) {
  const contextValue = React.useContext(AppContext);
  const Data = contextValue["getExplore"];
  // const profileNew = contextValue["profile"];

  useEffect(() => {
    Data();
  }, []);

  return (
    <AppConsumer>
      {({ explorePosts }) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          {explorePosts && <ExploreCard data={explorePosts} />}
        </SafeAreaView>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({});
