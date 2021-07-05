import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "../../screens/Account";
import AddBlogScreen from "../../screens/AddBlogScreen";
import BlogNavigator from "./BlogNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddBlogButton from "./AddBlogButton";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Blogs"
      component={BlogNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="AddBlog"
      component={AddBlogScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <AddBlogButton onPress={() => navigation.navigate("AddBlog")} />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
