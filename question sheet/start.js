//import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { FlatList } from "react-native";
//import { CheckBox, Input } from "@rneui/themed";
//import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const stack = createNativeStackNavigator();

let questions = [
  {
    prompt:
      "In the Withcer, who is your favorite character out of the 4 provided?",
    type: "multiple-choice",
    choices: ["Yennefer", "Cirilla", "Dandellion", "Geralt"],
    correcct: 1,
  },
  {
    prompt: "What is your favorite pass time?",
    type: "text-input",
  },
  {
    prompt: "How many pages was the longest book you have read?",
    type: "dropdown",
    choices: ["200-400", "400-600", "600-800", "800+"],
  },
];

function startScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Start Questions"
        onPress={() => navigation.navigate("question")}
      />
    </View>
  );
}

export default function App() {
  const [userResponse, getUserResponse] = useState();

  return (
    <View>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Question" component={question} />
          <Stack.Screen name="questionTwo" component={questionTwo} />
          <Stack.Screen name="questionThree" component={questionThree} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
/*
1. have the questions appear on the screen when the user clicks the start questions button
2. save the responses to the system, check by using the console
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: "center",
  },
});
//https://reactnative.dev/docs/checkbox
