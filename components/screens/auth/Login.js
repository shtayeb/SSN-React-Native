import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import API from "../../constants/API";

import FormButton from "../../components/Form/FormButton";
import SocialButtons from "../../components/Form/SocialButtons";
import FormInput from "../../components/Form/FormInput";
import { AppConsumer } from "../../Context/MyContext";
import { ScrollView } from "react-native-gesture-handler";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false,
    };
    this.onSignIn = this.onSignIn.bind(this);
  }

  changeLoading = () => {
    this.setState({ loading: false });
  };

  onSignIn(logIn) {
    // const data = { email: this.state.email, password: this.state.password };
    // this.props.navigation.navigate("BottomNavigator");
    this.setState({ loading: true }, async () => {
      const res = await logIn(
        this.state.email,
        this.state.password,
        this.changeLoading
      );
      // console.log(res);
      // // this.setState({ loading: false });
      // if (res === "success") {
      //   this.props.navigation.navigate("BottomNavigator");
      // }
      // if (res === "failed") {
      //   this.setState({ loading: false });
      // }
    });
  }

  render() {
    return (
      // <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.text}>Danesh Community</Text>
        <FormInput
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          labelValue={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <FormInput
          placeholderText="Password"
          iconType="lock"
          labelValue={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        {this.state.loading && (
          <ActivityIndicator size="large" color="#00ff00" />
        )}

        <AppConsumer>
          {(value) => {
            return (
              <FormButton
                buttonTitle="Sign In"
                onPress={() => {
                  this.onSignIn(value.logIn);
                }}
              />
            );
          }}
        </AppConsumer>

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotButton}>Forgot Password</Text>
        </TouchableOpacity>

        <SocialButtons
          buttonTitle="Sign In With Facebook"
          btnType="facebook"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => {}}
        />
        <SocialButtons
          buttonTitle="Sign In With Google"
          btnType="google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          onPress={() => {}}
        />

        <TouchableOpacity style={styles.forgotButton}>
          <Text
            style={styles.forgotButton}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            Dont Have an Account Create Here..
          </Text>
        </TouchableOpacity>
      </ScrollView>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 130,
    width: 130,
    resizeMode: "cover",
  },
  text: {
    // fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 5,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 5,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2e64e5",
    // fontFamily: "Lato-Regular",
  },
});
