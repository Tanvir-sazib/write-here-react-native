import React from "react";
import { Image, StyleSheet, ScrollView, View } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import colors from "../config/colors";

const BlogDetails = ({ route }) => {
  const blog = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        {/* <Image style={styles.image} source={blog.image} /> */}

        <AppText style={styles.title}>{blog.title}</AppText>
        <AppText style={styles.price}>{blog.content}</AppText>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {},
  detailsContainer: {
    padding: 15,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    marginVertical: 20,
  },
  price: {
    color: colors.medium,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default BlogDetails;
