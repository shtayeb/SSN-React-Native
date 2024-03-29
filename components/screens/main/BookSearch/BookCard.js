import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import API from "../../../constants/API";
import RenderListBook from "./RenderListBook";
export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      data: null,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(keyword) {
    // this.setState({ data: [] });
    // console.log(this.state.keyword);
    API.get("api/search/book", { keyword: keyword })
      .then((res) => {
        console.log(res.data);
        // this.setState({ data: res.data });
        this.setState(() => {
          return { data: res.data };
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  clickEventListener(item) {
    // Alert.alert(item.name);
    // console.log(item);
    this.props.navigation.navigate("SingleBooks", { item });
    // this.props.navigation.navigate("Test");
  }

  render() {
    return (
      <View style={styles.container}>
        {/* the search bar */}
        <View style={styles.formContent}>
          <TouchableOpacity>
            <Image
              style={[styles.icon, styles.inputIcon, styles.backButton]}
              source={require("../../../assets/al.png")}
              onPress={() => this.props.navigation.goBack()}
            />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Image
              style={[styles.icon, styles.inputIcon]}
              source={require("../../../assets/search.png")}
            />
            <TextInput
              style={styles.inputs}
              ref={"txtPassword"}
              // labelValue={this.state.keyword}
              onChangeText={(keyword) => this.handleSearch(keyword)}
              placeholder="Enter Name of The Book"
              underlineColorAndroid="transparent"
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("BookCategories")}
          >
            <Image
              style={[styles.icon, styles.inputIcon, styles.menuButton]}
              source={require("../../../assets/icons/book.png")}
            />
          </TouchableOpacity>
        </View>
        {/* end of the search bar */}

        {/* start of conditional part */}
        {this.state.data ? (
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => {
              return item.id.toString();
            }}
            renderItem={({ item }) => (
              <RenderListBook item={item} navigation={this.props.navigation} />
            )}
          />
        ) : (
          <ScrollView>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={require("../../../assets/searchimg.png")} />
              <Text>Search for the Books From Here</Text>
            </View>
          </ScrollView>
        )}

        {/* end of the conditional part */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  formContent: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 2,
  },
  menuButton: {
    marginLeft: 10,
    marginRight: 15,
  },
  backButton: {
    marginRight: 10,
  },
});
