import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as yup from "yup";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";
import ImageInput from "../components/ImageInput";
import firebase from "firebase";
import firebaseConfig from "../database/firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const validationSchema = yup.object().shape({
  title: yup.string().required().min(1).label("Title"),
  description: yup.string().label("Description"),
});

var db = firebase.firestore();

const AddBlogScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const handleSubmit = async () => {
    try {
      if (title !== "" && content !== "") {
        await db.collection("blogs").add({
          title: title,
          content: content,
        });
        setTitle("");
        setContent("");
        navigation.navigate("BlogList");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Screen style={styles.container}>
      <AppText style={defaultStyles.headingText}>Add a post</AppText>
      <AppForm
        initialValues={{
          title: title,
          description: content,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          maxLength={255}
          name="title"
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
        />
        <AppFormField
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
          onChangeText={(text) => setContent(text)}
        />
        {/* <ImageInput setImageUrl={setImageUrl} /> */}
        <SubmitButton title="Post Blog" handleSubmit={handleSubmit} />
      </AppForm>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
  },
});

export default AddBlogScreen;
