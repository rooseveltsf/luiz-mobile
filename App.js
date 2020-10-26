import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/context/Auth";

import Routes from './src/routes';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}