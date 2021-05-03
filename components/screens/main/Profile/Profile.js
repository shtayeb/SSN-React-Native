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
import ProfileListHeader from "./ProfileListHeader";
export default function Profile({ navigation }) {
  const [collectionSelected, setCollectionSelected] = useState(true);
  const contextValue = React.useContext(AppContext);
  const Data = contextValue["getProfile"];
  const logOut = contextValue["logOut"];
  let flag = "true";
  // const profileNew = contextValue["profile"];

  useEffect(() => {
    Data();
  }, []);

  const onTabPressed = () => {
    setCollectionSelected(!collectionSelected);
  };

  return (
    <AppConsumer>
      {(value) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          {value.posts && (
            <ExploreCard
              data={value.posts}
              // ListHeader={ProfileListHeader(
              //   stats,
              //   profile,
              //   navigation,
              //   logOut,
              //   flag
              // )}
              ListHeader={() => (
                <ProfileListHeader
                  stats={value.stats}
                  profile={value.profile}
                  navigation={navigation}
                  logOut={logOut}
                  flag={flag}
                />
              )}
            />
          )}
        </SafeAreaView>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({});
