import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";

const AppText = ({ children, style, ...otherProps }) => {
  return (
    <View>
      <Text style={[styles.text, style]} {...otherProps}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      ios: {
        fontSize: 20,
        fontFamily: "Avenir",
      },
      android: {
        fontSize: 18,
        fontFamily: "Roboto",
      },
    }),
  },
});

export default AppText;
