import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { RESOURCE_URL } from "../../../constants/Variables";

const RenderListBook = ({ item, navigation }) => {
  const MyclickEventListener = (item) => {
    navigation.navigate("SingleBooks", { item });
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => MyclickEventListener(item)}
    >
      <View style={styles.cardHeader}>
        {/* <Image
                    style={styles.icon}
                    source={{
                      uri:
                        RESOURCE_URL + item.cover ||
                        "https://img.icons8.com/flat_round/64/000000/hearts.png",
                    }}
                  /> */}
      </View>
      <Image
        style={styles.userImage}
        source={{ uri: RESOURCE_URL + item.cover }}
      />
      <View style={styles.cardFooter}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.position}>{item.author}</Text>
          <TouchableOpacity
            style={styles.followButton}
            onPress={() => MyclickEventListener(item)}
          >
            <Text style={styles.followButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderListBook;

const styles = StyleSheet.create({
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: "white",
    flexBasis: "46%",
    marginHorizontal: 5,
    borderRadius: 8,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage: {
    height: 150,
    width: 120,
    borderRadius: 2,
    alignSelf: "center",
    // borderColor: "#DCDCDC",
    // borderWidth: 3,
  },
  name: {
    fontSize: 15,
    flex: 1,
    alignSelf: "center",
    color: "#008080",
    fontWeight: "bold",
  },
  position: {
    fontSize: 10,
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});
