import React, { useCallback, useMemo, useRef, useState } from "react";
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
  Button,
} from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { call } from "react-native-reanimated";

export default function Contacts() {
  // const { expand } = useBottomSheet();
  const [calls, setCalls] = useState([
    {
      id: 1,
      name: "Mark Doe",
      status: "active",
      image: "https://bootdey.com/img/Content/avatar/avatar7.png",
    },
    {
      id: 2,
      name: "Clark Man",
      status: "active",
      image: "https://bootdey.com/img/Content/avatar/avatar6.png",
    },
    {
      id: 3,
      name: "Jaden Boor",
      status: "active",
      image: "https://bootdey.com/img/Content/avatar/avatar5.png",
    },
    {
      id: 4,
      name: "Srick Tree",
      status: "active",
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      id: 5,
      name: "Erick Doe",
      status: "active",
      image: "https://bootdey.com/img/Content/avatar/avatar3.png",
    },
    {
      id: 6,
      name: "Francis Doe",
      status: "active",
      image: "https://bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      id: 8,
      name: "Matilde Doe",
      status: "active",
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 9,
      name: "John Doe",
      status: "active",
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      id: 10,
      name: "Fermod Doe",
      status: "active",
      image: "https://bootdey.com/img/Content/avatar/avatar7.png",
    },
    {
      id: 11,
      name: "Danny Doe",
      status: "active",
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
  ]);

  // ref
  const sheetRef = useRef(null);
  // variables
  // const data = useMemo(calls);
  const data = useMemo(() => calls, []);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  //callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapTo(index);
  }, []);

  const renderItem__ = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

  // render
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              <Text style={styles.mblTxt}>Mobile</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetFlatList
          data={data}
          keyExtractor={(i) => i.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
      </BottomSheet>
      <View
        style={{
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button title="expand the Sheet" onPress={handleClosePress} />
        <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
      </View>
      {/* <FlatList
        // extraData={this.state}
        data={calls}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        renderItem={renderItem}
      /> */}
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
