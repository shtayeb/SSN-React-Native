import React, { Component } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../constants/API";
// import { storeProducts, detailProduct } from "./data";

const AppContext = React.createContext();
//provider
//consumer

class AppProvider extends Component {
  state = {
    user: {},
    test: "done",
    loggedIn: false,
    feedPosts: {},
    profile: {},
    stats: {},
    posts: [],
    explorePosts: [],
    // detailProduct: detailProduct,
  };

  componentDidMount() {
    // this.setProducts();
    this.isLoggedIn();
  }

  logIn = async (email, password) => {
    API.get("sanctum/csrf-cookie")
      .then(() => {
        API.post("api/auth/login", { email: email, password: password })
          .then(async (res) => {
            // localStorage.setItem("AuthToken", res.data.data.token);
            // const jsonValue = JSON.stringify(res.data.data.token);
            await AsyncStorage.setItem("@AuthToken", res.data.data.token);
            // localStorage.setItem(
            //   "AuthUser",
            //   JSON.stringify(res.data.data.user)
            // );
            this.setState({ user: res.data.data.user });
            this.setState({ loggedIn: true });
            return "success";
          })
          .catch((err) => {
            console.log("not the response");
            console.log(err);
            // this.setState({ loading: false });
            Alert.alert(
              "AUTHENTICATON FAILED ",
              "Check the Email and Password",
              [{ text: "Sorry", style: "cancel" }]
            );
            return "failed";
          });
      })
      .catch((err) => {
        console.log(err);
        return "failed";
      });
  };

  isLoggedIn = async () => {
    //check the local storage for the token
    // const token = localStorage.getItem("AuthToken");
    const token = await AsyncStorage.getItem("@AuthToken");
    // console.log(token);

    if (token) {
      this.setState({ loggedIn: true });
      API.get("sanctum/csrf-cookie")
        .then(() => {
          API.get("api/me")
            .then((res) => {
              console.log(res.data);
              this.setState({ user: res.data });
              this.setFeedPosts();
            })
            .catch((err) => {
              console.log("not the response");
              console.log(err);
              this.setState({ loggedIn: false });
            });
        })
        .catch((err) => {
          console.log(err);
          return "failed";
        });
    }
  };

  logOut = () => {
    // call to api/auth/logout to delete token from database
    API.get("sanctum/csrf-cookie")
      .then(() => {
        API.post("api/auth/logout")
          .then((res) => {
            localStorage.removeItem("AuthToken");
            this.setState({ user: {} });
            this.setState({ loggedIn: false });
            return "success";
          })
          .catch((err) => {
            console.log("not the response");
            console.log(err);
            return "failed";
          });
      })
      .catch((err) => {
        console.log(err);
        return "failed";
      });
  };

  setFeedPosts = () => {
    let tempdata = {};
    API.get("sanctum/csrf-cookie")
      .then(() => {
        API.get("api/main-page")
          .then((res) => {
            // console.log(res.data);
            this.setState(() => {
              return { feedPosts: res.data };
            });
          })
          .catch((err) => {
            console.log("not the response");
            console.log(err);
            return "failed";
          });
      })
      .catch((err) => {
        console.log(err);
        return "failed";
      });
  };

  //   The Functions in the context
  getProfile = () => {
    API.get("sanctum/csrf-cookie")
      .then(() => {
        API.get("api/profile/" + this.state.user.id)
          .then((res) => {
            // console.log(res.data);
            this.setState(() => {
              return { profile: res.data.profile };
            });
            this.setState(() => {
              return { stats: res.data.stats[0] };
            });
            this.setState(() => {
              return { posts: res.data.posts };
            });
            console.log(this.state.posts);
          })
          .catch((err) => {
            console.log("not the response");
            console.log(err);
            return "failed";
          });
      })
      .catch((err) => {
        console.log(err);
        return "failed";
      });
  };

  getExplore = () => {
    API.get("sanctum/csrf-cookie")
      .then(() => {
        API.get("api/explore")
          .then((res) => {
            console.log(res.data);
            this.setState(() => {
              return { explorePosts: res.data };
            });
          })
          .catch((err) => {
            console.log("not the response");
            console.log(err);
            return "failed";
          });
      })
      .catch((err) => {
        console.log(err);
        return "failed";
      });
  };

  //   The Functions in the context
  __getProfile = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);

    this.setState(() => {
      return { detailProduct: product };
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          logOut: this.logOut,
          logIn: this.logIn,
          getProfile: this.getProfile,
          getExplore: this.getExplore,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppConsumer = AppContext.Consumer;

export { AppProvider, AppConsumer, AppContext };
