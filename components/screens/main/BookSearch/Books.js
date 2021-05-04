import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Linking,
} from "react-native";
import API from "../../../constants/API";
import { API_URL, RESOURCE_URL } from "../../../constants/Variables";
import { downloadToFolder } from "expo-file-dl";

import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import {
  AndroidImportance,
  AndroidNotificationVisibility,
  NotificationChannel,
  NotificationChannelInput,
  NotificationContentInput,
} from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const channelId = "DownloadInfo";

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadProgress: "0%",
    };
  }
  componentDidMount() {
    // this.getMediaLibraryPermissions();
    // this.getNotificationPermissions();
    this.setNotificationChannel();
  }

  downloadProgressUpdater = ({
    totalBytesWritten,
    totalBytesExpectedToWrite,
  }: {
    totalBytesWritten: number,
    totalBytesExpectedToWrite: number,
  }) => {
    const pctg = 100 * (totalBytesWritten / totalBytesExpectedToWrite);
    // setDownloadProgress(`${pctg.toFixed(0)}%`);
    this.setState({ downloadProgress: `${pctg.toFixed(0)}%` });
  };

  async setNotificationChannel() {
    const loadingChannel: NotificationChannel | null = await Notifications.getNotificationChannelAsync(
      channelId
    );

    // if we didn't find a notification channel set how we like it, then we create one
    if (loadingChannel == null) {
      const channelOptions: NotificationChannelInput = {
        name: channelId,
        importance: AndroidImportance.HIGH,
        lockscreenVisibility: AndroidNotificationVisibility.PUBLIC,
        sound: "default",
        vibrationPattern: [250],
        enableVibrate: true,
      };
      await Notifications.setNotificationChannelAsync(
        channelId,
        channelOptions
      );
    }
  }
  async getMediaLibraryPermissions() {
    await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  }
  async getNotificationPermissions() {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
  async clickEventListener(pdf) {
    this.getNotificationPermissions();
    this.getMediaLibraryPermissions();

    let uri = API_URL + "api/storage_get/" + pdf;
    // console.log(uri);
    // Alert.alert("Downloading", this.state.downloadProgress);
    // Linking.openURL(RESOURCE_URL + pdf);
    // let pdffile;
    // console.log(pdf);
    // API.get("/api/storage_get/" + pdf)
    //   .then((res) => {
    //     console.log(res);
    //     pdffile = res.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // let uri = API_URL + "/api/storage_get/" + pdf;
    let filename = pdf.split("/")[2];
    let folder = "Danesh Books";
    // let channelId = "Danesh";
    // await downloadToFolder(uri, filename, folder);
    await downloadToFolder(uri, filename, folder, channelId, {
      downloadProgressCallback: this.downloadProgressUpdater,
    });
  }

  render() {
    // const { navigation } = this.props;
    const item = this.props.route.params.item;
    // console.log(item);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: "center", marginHorizontal: 30 }}>
            <Image
              style={styles.productImg}
              source={{ uri: RESOURCE_URL + item.cover }}
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>12k Downloads</Text>
            <Text style={styles.description}>{item.caption}</Text>
          </View>
          <View style={styles.starContainer}>
            <Image
              style={styles.star}
              source={{
                uri: "https://img.icons8.com/color/40/000000/star.png",
              }}
            />
            <Image
              style={styles.star}
              source={{
                uri: "https://img.icons8.com/color/40/000000/star.png",
              }}
            />
            <Image
              style={styles.star}
              source={{
                uri: "https://img.icons8.com/color/40/000000/star.png",
              }}
            />
            <Image
              style={styles.star}
              source={{
                uri: "https://img.icons8.com/color/40/000000/star.png",
              }}
            />
            <Image
              style={styles.star}
              source={{
                uri: "https://img.icons8.com/color/40/000000/star.png",
              }}
            />
          </View>
          <View style={styles.contentColors}>
            <TouchableOpacity
              style={[styles.btnColor, { backgroundColor: "#00BFFF" }]}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnColor, { backgroundColor: "#FF1493" }]}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnColor, { backgroundColor: "#00CED1" }]}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnColor, { backgroundColor: "#228B22" }]}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnColor, { backgroundColor: "#20B2AA" }]}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnColor, { backgroundColor: "#FF4500" }]}
            ></TouchableOpacity>
          </View>
          <View style={styles.contentSize}>
            <TouchableOpacity style={styles.btnSize}>
              <Text>S</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSize}>
              <Text>M</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSize}>
              <Text>L</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSize}>
              <Text>{this.state.downloadProgress}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.addToCarContainer}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => this.clickEventListener(item.pdf)}
            >
              <Text style={styles.shareButtonText}>Download</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "bold",
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginTop: 10,
    color: "#696969",
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: "#778899",
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: "white",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  starContainer: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  contentColors: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  contentSize: {
    justifyContent: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
  },
});
