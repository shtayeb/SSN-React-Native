import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import API from "../../../constants/API";
import RenderListBook from "./RenderListBook";

const CategoryList = (props) => {
  const id = props.route.params.id;
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
    return () => {
      setData(null);
    };
  }, []);

  const getData = () => {
    //the api endpoint to get the books
    let category = "";
    // console.log(id);
    if (id === "1") {
      category = "it";
    } else if (id === "2") {
      category = "pd";
    } else if (id === "3") {
      category = "is";
    } else if (id === "4") {
      category = "p";
    } else {
      category = "gi";
    }

    // console.log(category);

    API.get("api/books/" + category)
      .then((res) => {
        // console.log(res.data);
        // this.setState({ data: res.data });
        setData(() => res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View>
      {data ? (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={data}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          renderItem={({ item }) => (
            <RenderListBook item={item} navigation={props.navigation} />
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
            <Text>Your Books are Loading....</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: "center",
  },
});
