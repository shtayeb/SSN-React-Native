import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";

export default class Craigslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [
        {
          id: "1",
          name: "Information Technology",
          // image: "https://img.icons8.com/clouds/100/000000/groups.png",
          image: "https://img.icons8.com/nolan/2x/computer.png",
          count: 124.711,
        },
        {
          id: "2",
          name: "Personal Development",
          // image: "https://img.icons8.com/color/100/000000/real-estate.png",
          image: "https://img.icons8.com/clouds/2x/development-skill.png",
          count: 234.722,
        },
        {
          id: "3",
          name: "Islamic Studies",
          image: "https://img.icons8.com/ultraviolet/2x/mosque.png",
          count: 324.723,
        },
        {
          id: "4",
          name: "Politics",
          image: "https://img.icons8.com/nolan/2x/parliament.png",
          count: 154.573,
        },
        {
          id: "5",
          name: "General Information",
          image: "https://img.icons8.com/clouds/2x/information.png",
          count: 124.678,
        },
      ],
    };
  }

  clickEventListener = ({ id }) => {
    // Alert.alert("Message", "Item clicked. " + item.name);
    this.props.navigation.navigate("CategoryList", { id });
    // console.log(item);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  this.clickEventListener(item);
                }}
              >
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  {/* <Text style={styles.count}>{item.count}</Text> */}
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => this.clickEventListener(item)}
                  >
                    <Text style={styles.followButtonText}>Explore now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    // backgroundColor: "#ebf0f7",
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7",
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 30,
  },

  name: {
    fontSize: 16,
    flex: 1,
    // alignSelf: "center",
    color: "#3399ff",
    fontWeight: "bold",
  },
  count: {
    fontSize: 14,
    flex: 1,
    // alignSelf: "center",
    color: "#6666ff",
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    // borderColor: "#dcdcdc",
  },
  followButtonText: {
    // color: "#dcdcdc",
    fontSize: 12,
  },
});
