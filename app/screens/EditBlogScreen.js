import React from "react";
import { StyleSheet } from "react-native";
import * as yup from "yup";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";
import ImageInput from "../components/ImageInput";
import { useState } from "react";
import firebase from "firebase";
import firebaseConfig from "../database/firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const db = firebase.firestore();

const validationSchema = yup.object().shape({
  title: yup.string().required().min(1).label("Title"),
  description: yup.string().label("Description"),
});

const AddBlogScreen = ({ route, navigation }) => {
  const blog = route.params;
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);

  const handleEdit = async () => {
    db.collection("blogs").doc(blog.id).set({
      title: title,
      content: content,
    });
    navigation.navigate("BlogList");
  };

  return (
    <Screen style={styles.container}>
      <AppText style={defaultStyles.headingText}>Edit your blog</AppText>
      <AppForm
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          defaultValue={title}
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
          defaultValue={content}
          onChangeText={(text) => setContent(text)}
        />
        {/* <ImageInput /> */}
        <SubmitButton title="Post Blog" handleSubmit={handleEdit} />
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
