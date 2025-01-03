//import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { FlatList } from "react-native";
//import { CheckBox, Input } from "@rneui/themed";
//import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

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
    <View style={styles.centerButton}>
      <Button
        title="Start Questions"
        onPress={() => navigation.navigate("question")}
      />
    </View>
  );
}

function question({ navigation }) {
  return (
    <View>
      <View style={styles.bottomButton}>
        <Button
          title="Next"
          onPress={() => navigation.navigate("questionTwo")}
        />
      </View>
    </View>
  );
}

function questionTwo({ navigation }) {
  return (
    <View>
      <View style={styles.bottomButton}>
        <Button
          title="Next"
          onPress={() => navigation.navigate("questionThree")}
        />
        <Button title="Back" onPress={() => navigation.navigate("question")} />
      </View>
    </View>
  );
}

function questionThree({ navigation }) {
  return (
    <View>
      <View style={styles.bottomButton}>
        <Button title="Next" onPress={() => navigation.navigate("summary")} />
        <Button
          title="Back"
          onPress={() => navigation.navigate("questionTwo")}
        />
      </View>
    </View>
  );
}

function summary({ navigation }) {
  return (
    <View>
      <View style={styles.container}>
        <Text>Summary page</Text>
      </View>
      <View style={styles.bottomButton}>
        <Button
          title="Take Again"
          onPress={() => navigation.navigate("Start")}
        />
      </View>
    </View>
  );
}

export default function App() {
  const [userResponse, getUserResponse] = useState();

  return (
    <View>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={startScreen} />
          <Stack.Screen name="question" component={question} />
          <Stack.Screen name="questionTwo" component={questionTwo} />
          <Stack.Screen name="questionThree" component={questionThree} />
          <Stack.Screen name="summary" component={summary} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
/*
1. get the buttons to work, so the user can navigate between the screens effectively
2. make the questions appear on the desired screens
3. make sure the user can answer the questions
4. make sure answers are saved to the system
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
  centerButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  bottomButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 500,
    marginLeft: 500,
  },
});
//https://reactnative.dev/docs/checkbox
