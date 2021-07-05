import React from "react";
import {
  Image,
  StyleSheet,
  Button,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import firebase from "firebase";
import firebaseConfig from "../database/firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const db = firebase.firestore();

const Card = ({
  title,
  subtitle,
  image,
  onPress,
  navigation,
  onEditPress,
  item,
}) => {
  const onDeletePress = () => {
    db.collection("blogs")
      .doc(item.id)
      .delete()
      .then(() => {
        alert("Document successfully deleted!");
      })
      .catch((error) => {
        alert("Error removing document: ", error);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {/* <Image style={styles.image} source={image} /> */}
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subtitle}>
            {subtitle.substring(0, 250)}....
          </AppText>
          <View style={styles.button}>
            <Button
              title="Edit post"
              color={colors.secondary}
              onPress={onEditPress}
            />
            <Button
              title="Delete Post"
              color={colors.primary}
              onPress={onDeletePress}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 7,
    fontSize: 25,
    fontWeight: "600",
  },
  subtitle: {
    color: colors.medium,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
  },
});
export default Card;
