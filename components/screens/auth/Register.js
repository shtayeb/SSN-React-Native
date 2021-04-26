import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import API from "../../constants/API";
import FormButton from "../../components/Form/FormButton";
import SocialButtons from "../../components/Form/SocialButtons";
import FormInput from "../../components/Form/FormInput";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const {
      email,
      password,
      name,
      username,
      password_confirmation,
    } = this.state;
    console.log("started");
    API.get("sanctum/csrf-cookie")
      .then(() => {
        //make a request to /login
        API.post("api/auth/register", {
          name: name,
          email: email,
          username: username,
          password: password,
          password_confirmation: password_confirmation,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("not the response");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("not the csrf token");
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Create an Account</Text>
        <FormInput
          placeholderText="Name"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false}
          labelValue={this.state.name}
          onChangeText={(name) => this.setState({ name })}
        />
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
          placeholderText="Username"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false}
          labelValue={this.state.username}
          onChangeText={(username) => this.setState({ username })}
        />
        <FormInput
          placeholderText="Password"
          iconType="lock"
          labelValue={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <FormInput
          placeholderText="Confirm Password"
          iconType="lock"
          labelValue={this.state.password_confirmation}
          secureTextEntry={true}
          onChangeText={(password_confirmation) =>
            this.setState({ password_confirmation })
          }
        />

        <FormButton buttonTitle="Sign Up" onPress={() => alert("signup")} />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By Registering, you accept our
          </Text>
          <TouchableOpacity>
            <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
              Terms of Services
            </Text>
          </TouchableOpacity>
          {/* <Text style={styles.color_textPrivate}>and</Text>
          <TouchableOpacity>
            <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
              Privacy policy
            </Text>
          </TouchableOpacity> */}
        </View>

        <SocialButtons
          buttonTitle="Sign Up With Facebook"
          btnType="facebook"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => {}}
        />
        <SocialButtons
          buttonTitle="Sign Up With Google"
          btnType="google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          onPress={() => {}}
        />
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

  text: {
    // fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },

  navButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2e64e5",
    // fontFamily: "Lato-Regular",
  },
  textPrivate: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },

  // screen: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // box: {
  //   width: "80%",
  // },
});
