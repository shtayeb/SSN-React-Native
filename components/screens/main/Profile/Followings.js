import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import Header from "../../../components/Header";
import API from "../../../constants/API";
import { RESOURCE_URL } from "../../../constants/Variables";
import { AppContext } from "../../../Context/MyContext";
export default function Followings(props) {
  const passedProfile = props.route.params.profile;
  const contextValue = React.useContext(AppContext);
  const { user } = contextValue;
  const [calls, setCalls] = useState(null);
  useEffect(() => {
    // "/profile/"+"{user.id}+"/followers"
    API.get("sanctum/csrf-cookie")
      .then(() => {
        API.get(`api/profile/${passedProfile.user_id}/followings`)
          .then((res) => {
            console.log(res.data);
            setCalls(res.data);
          })
          .catch((err) => {
            console.log("not the response");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);

  const handleRemovePress = (id) => {
    let filteredList = calls.filter((profile) => {
      return profile.id !== id;
    });
    API.post("api/removefollow/" + id)
      .then((res) => {
        console.log(res.data);
        setCalls(filteredList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderItem = ({ item }) => {
    return (
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
              <TouchableOpacity onPress={() => handleRemovePress(item.id)}>
                <Text style={styles.mblTxt}>Remove</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.user_id}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Header
        title="Followings"
        goBack={navigation.goBack}
        openDrawer={navigation.openDrawer}
      /> */}
      <FlatList
        // extraData={this.state}
        data={calls}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        renderItem={renderItem}
      />
    </SafeAreaView>
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
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
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
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15,
  },
});
