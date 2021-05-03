import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import Header from "../../../components/Header";
import FormButton from "../../../components/Form/FormButton";
import { ScrollView } from "react-native-gesture-handler";
import { AppContext } from "../../../Context/MyContext";
import { RESOURCE_URL } from "../../../constants/Variables";
import API from "../../../constants/API";
import * as DocumentPicker from "expo-document-picker";

const EditProfile = ({ navigation }) => {
  const contextValue = React.useContext(AppContext);
  const profile = contextValue["profile"];
  const user = contextValue["user"];
  const updateProfileDataContext = contextValue["updateProfileDataContext"];
  // get a function from context that update the profile values in the context
  // updateProfileDataContext(data);
  const [profilename, setProfileName] = useState(profile.title);
  const [profilebio, setProfileBio] = useState(profile.desc);
  const [profileurl, setProfileUrl] = useState(profile.url);
  const [profileimage, setProfileImage] = useState(profile.image);

  const handleProfileImageUpdate = async () => {
    //get the file
    // getDocumentAsync(option) is object and takes following
    // type(string)
    // copyToCacheDirectory (boolean)
    //multiple (boolean)
    //On success returns a promise that resolves to an object containing
    // { type: 'success', uri, name, size } where uri is a URI to the local document file,
    // name is its original name and size is its size in bytes.
    // If the user cancelled the document picking, the promise resolves to { type: 'cancel' }.
    const result = await DocumentPicker.getDocumentAsync({});
    console.log(result.name);
    // if (result.type === 'success') {
    //   setNewDocument({
    //     url: 'https://{{server}}/file',
    //     name: result.name,
    //   })
    //hit the PATCH /profileimage/{user}
    //update the profileimage state to the value retrieved from res.data
  };
  const handleProfileUpadte = () => {
    // hit the PATCH::/profile/{user}
    const data = {
      title: profilename,
      desc: profilebio,
      url: profileurl,
    };
    API.patch("api/profile/" + user.id, data)
      .then((res) => {
        console.log(res.data);
        updateProfileDataContext(data);
        Alert.alert("Successful ", "Your Profile Has Been Updated", [
          { text: "OK", style: "cancel" },
        ]);
        // console.log(calls);
      })
      .catch((err) => {
        console.log("not the response");
        console.log(err);
        Alert.alert(
          "Failed to Update ",
          "Something Went Wrong Please Try Again...",
          [{ text: "Sorry", style: "cancel" }]
        );
      });
    console.log("updated");
    // console.log(user.id);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <Header
          title="Edit Profile"
          goBack={navigation.goBack}
          openDrawer={navigation.openDrawer}
        />
        {/* the upadate profile pic section */}
        <TouchableOpacity
          onPress={handleProfileImageUpdate}
          style={{ alignItems: "center", marginTop: 40 }}
        >
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
            }}
          >
            <ImageBackground
              source={{
                uri: profileimage
                  ? RESOURCE_URL + profileimage ||
                    "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                  : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
              }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../assets/icons/grid1.png")}
                  // style={{ width: 25, height: 25 }}
                  style={{
                    opacity: 0.7,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        {/* end of update profile pic section */}
        <View style={styles.inputWrapper}>
          <View style={styles.action}>
            <Image
              source={require("../../../assets/icons/user.png")}
              style={{ width: 25, height: 25 }}
            />

            <TextInput
              placeholder="Your Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={profilename}
              onChangeText={(txt) => setProfileName(txt)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <Image
              source={require("../../../assets/icons/book.png")}
              style={{
                width: 25,
                height: 25,
              }}
            />
            <TextInput
              placeholder="Bio"
              placeholderTextColor="#666666"
              value={profilebio}
              onChangeText={(txt) => setProfileBio(txt)}
              multiline={true}
              style={styles.textInput}
              numberOfLines={3}
            />
          </View>
          <View style={styles.action}>
            <Image
              source={require("../../../assets/icons/grid1.png")}
              style={{ width: 25, height: 25 }}
            />
            <TextInput
              placeholder="URL"
              placeholderTextColor="#666666"
              value={profileurl}
              onChangeText={(txt) => setProfileUrl(txt)}
              autoCorrect={true}
              style={[styles.textInput, { height: 40 }]}
            />
          </View>

          <FormButton buttonTitle="Update" onPress={handleProfileUpadte} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  screen: {
    // padding: 20,
    //   marginTop: 10
    flex: 1,
    backgroundColor: "#fff",
  },
  inputWrapper: {
    padding: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#333333",
  },
});
