import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FlatList, ScrollView, View, StyleSheet } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import firebase from "firebase";
import firebaseConfig from "../database/firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const db = firebase.firestore();

const BlogListScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    db.collection("blogs").onSnapshot((querySnapshot) => {
      const newBlog = [];
      querySnapshot.docs.forEach((doc) => {
        const { title, content } = doc.data();
        newBlog.push({
          id: doc.id,
          title,
          content,
        });
        setBlogs(newBlog);
      });
    });
  }, []);
  return (
    <ScrollView>
      <Screen style={styles.screen}>
        <FlatList
          data={blogs}
          keyExtractor={(blog) => blog.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subtitle={item.content}
              image={item.image}
              onPress={() => navigation.navigate("BlogDetails", item)}
              onEditPress={() => navigation.navigate("EditBlog", item)}
              item={item}
            />
          )}
        />
      </Screen>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default BlogListScreen;
