import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import Screen from "../components/Screen";
import * as yup from "yup";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppText from "../components/AppText";
import colors from "../config/colors";
import SubmitButton from "../components/forms/SubmitButton";
import firebase from "firebase";
import firebaseConfig from "../database/firebase.config";
import { useState } from "react";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth();
const validationSchema = yup.object().shape({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(4).label("Password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleRegister = () => {
    if (password === confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.navigate("Login");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Confirm Password is not matched with password");
    }
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
        <AppText style={styles.welcomeText}>Welcome Back</AppText>
        <AppText style={{ color: colors.medium }}>
          Create an account to write your note!
        </AppText>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
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
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="confirmPassword"
            placeholder="Confirm Password"
            secureTextEntry
            textContentType="password"
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <SubmitButton title="Register" handleSubmit={handleRegister} />
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
  welcomeText: {
    fontSize: 30,
    fontWeight: "700",
  },
});
export default RegisterScreen;
