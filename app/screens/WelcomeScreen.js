import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    // <ImageBackground
    //   blurRadius={7}
    //   source={require("../assets/bg-1.jpg")}
    //   style={styles.background}
    // >
    <>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/welcome.png")}
        />
        <AppText style={styles.blogtext}>Write your daily blog here</AppText>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Login"
            onPress={() => navigation.navigate("Login")}
            color={colors.primary}
          />
          <AppButton
            title="Register"
            onPress={() => navigation.navigate("Register")}
            color={colors.secondary}
          />
        </View>
      </View>

      {/* // </ImageBackground> */}
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  blogtext: {
    fontWeight: "600",
    fontSize: 24,
  },

  logo: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    padding: 10,
    width: "100%",
  },
  logoContainer: {
    top: 80,
    alignItems: "center",
  },
});

export default WelcomeScreen;
