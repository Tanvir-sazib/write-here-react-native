import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BlogListScreen from "../../screens/BlogListScreen";
import BlogDetailsScreen from "../../screens/BlogDetails";
import EditBlogScreen from "../../screens/EditBlogScreen";

const Stack = createStackNavigator();

const BlogNavigator = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="BlogList"
        component={BlogListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="BlogDetails" component={BlogDetailsScreen} />
      <Stack.Screen name="EditBlog" component={EditBlogScreen} />
    </Stack.Navigator>
  );
};

export default BlogNavigator;
