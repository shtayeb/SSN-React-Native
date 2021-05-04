import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import ExploreCard from "../../../components/ExploreCard";
import API from "../../../constants/API";
import ProfileListHeader from "../Profile/ProfileListHeader";

const FeedProfile = (props) => {
  const item = props.route.params.item;
  const [data, setData] = useState(null);

  useEffect(() => {
    getProfile();
    return () => {
      setData(null);
    };
  }, []);
  const getProfile = () => {
    API.get("api/profile/" + item.user_id)
      .then((res) => {
        // console.log(res.data.profile);
        setData(() => res.data);
        // this.setState(() => {
        //   return { stats: res.data.stats[0] };
        // });
        // this.setState(() => {
        //   return { posts: res.data.posts };
        // });
        // console.log(this.state.posts);
      })
      .catch((err) => {
        console.log("not the response");
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {data && (
        <ExploreCard
          data={data.posts}
          ListHeader={() => (
            <ProfileListHeader
              stats={data.stats[0]}
              profile={data.profile[0]}
              navigation={props.navigation}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default FeedProfile;

const styles = StyleSheet.create({});
