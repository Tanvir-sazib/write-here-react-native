import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./app/components/navigation/navigationTheme";
import AppNavigator from "./app/components/navigation/AppNavigator";
import firebaseConfig from "./app/database/firebase.config";
import { createContext, useState } from "react";
import AuthNavigator from "./app/components/navigation/AuthNavigator";
import firebase from "firebase/app";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
export const AuthContext = createContext();
export default function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  return (
    <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <NavigationContainer theme={navigationTheme}>
        {loggedInUser ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
