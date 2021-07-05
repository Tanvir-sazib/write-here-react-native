import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import Screen from "../components/Screen";
import * as yup from "yup";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppText from "../components/AppText";
import colors from "../config/colors";
import SubmitButton from "../components/forms/SubmitButton";
import firebase from "firebase/app";
import "firebase/auth";
import defaultStyles from "../config/styles";
import { useState, useContext } from "react";
import { AuthContext } from "../../App";
import firebaseConfig from "../database/firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();

const validationSchema = yup.object().shape({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
});

const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const newUser = { ...user };
        setLoggedInUser(newUser);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <ScrollView>
      <Screen style={styles.screen}>
        <View>
          <Image
            style={styles.logo}
            source={require("../../assets/Mobile-login.jpg")}
          />
        </View>
        <AppText style={defaultStyles.headingText}>Welcome Back</AppText>
        <AppText style={{ color: colors.medium }}>
          Sign in to write your note!
        </AppText>
        <AppForm validationSchema={validationSchema}>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            onChangeText={(text) => setEmail(text)}
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            onChangeText={(text) => setPassword(text)}
          />
          <SubmitButton title="Login" handleSubmit={handleLogin} />
        </AppForm>
      </Screen>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    padding: 5,
  },
  logo: {
    width: 340,
    height: 200,
    resizeMode: "contain",
  },
});
export default LoginScreen;
