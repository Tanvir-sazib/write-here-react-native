import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { useContext } from "react";
import { AuthContext } from "../../App";

const Account = ({ navigation }) => {
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  console.log(loggedInUser.user.email);

  const logOutHandler = () => {
    setLoggedInUser("");
  };
  return (
    <Screen style={styles.container}>
      <TouchableOpacity onPress={logOutHandler}>
        <MaterialCommunityIcons name="logout" size={50} color={colors.medium} />
        <AppText>Log Out</AppText>
      </TouchableOpacity>
      <AppText style={{ color: colors.primary }}>
        {loggedInUser.user.email}
      </AppText>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Account;
