import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";

import API from "../../constants/API";

import FormButton from "../../components/Form/FormButton";
import SocialButtons from "../../components/Form/SocialButtons";
import FormInput from "../../components/Form/FormInput";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn() {
    this.props.navigation.navigate("BottomNavigator");
    // console.log("clikced");
    // const { email, password } = this.state;
    // //initial request to set Laravel authentication cookies
    // const data = { email: email, password: password };
    // API.get("sanctum/csrf-cookie")
    //   .then(() => {
    //     // console.log(token);
    //     API.post("api/auth/login", data)
    //       .then((res) => {
    //         console.log(res.data);
    //         // let errObj = JSON.parse(JSON.stringify(res));
    //         // console.log(errObj);
    //       })
    //       .catch((err) => {
    //         console.log("not the response");
    //         console.log(err);
    //         // let errObj = JSON.parse(JSON.stringify(err));
    //         // console.log(errObj);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log("not the csrf token");
    //     // console.log(err);
    //     let errObj = JSON.parse(JSON.stringify(err));
    //     console.log(errObj);
    //   });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../../images/logo.png")} style={styles.logo} />
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

        <FormButton
          buttonTitle="Sign In"
          onPress={() => {
            this.onSignIn();
          }}
        />

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
