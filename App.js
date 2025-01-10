//import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { FlatList } from "react-native";
//import { CheckBox, Input } from "@rneui/themed";
//import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TextInput } from "react-native-web";
//import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

let questions = [
  {
    prompt:
      "In the Withcer, who is your favorite character out of the 4 provided?",
    type: "multiple-choice",
    choices: ["Yennefer", "Cirilla", "Dandellion", "Geralt"],
  },
  {
    prompt: "What is your favorite pass time?",
    type: "text-input",
  },
  {
    prompt: "How many pages was the longest book you have read?",
    type: "multiple-choice",
    choices: ["200-400", "400-600", "600-800", "800+"],
  },
];

function startScreen({ navigation }) {
  return (
    <View style={styles.centerButton}>
      <Button
        title="Start Questions"
        onPress={() => navigation.navigate("questionScreen")}
      />
    </View>
  );
}

function QuestionScreen({ navigation, userResponse, setUserResponse }) {
  //this code saves the question order, and changes it when the user clicks the next button
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  //saves the responses from the user
  const handleRespone = (response) => {
    setUserResponse((prev) => {
      const updatedResponse = { ...prev, [currentQuestionIndex]: response };

      if (currentQuestionIndex === questions.length - 1) {
        navigation.navigate("summary", { userResponse: updatedResponse });
      }

      return updatedResponse;
    });
  };

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case "multiple-choice":
        return (
          <FlatList
            data={currentQuestion.choices}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Button
                title={item}
                onPress={() => {
                  handleRespone(item);
                  goToNextQuestion();
                }}
              />
            )}
          />
        );

      case "text-input":
        return (
          <TextInput
            placeholder="Type your answer here"
            onChangeText={(text) => handleRespone(text)}
            value={userResponse[currentQuestionIndex] || ""}
          />
        );

      default:
        return <Text>Something went wrong</Text>;
    }
  };

  /*as long as the questions number doesn't exceed the amound of questions ie 3, then it will as 1 to the question 
  number until it reaches 3 and sends the user to the summary screen*/
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <View>
      <Text>{currentQuestion.prompt}</Text>
      {renderQuestionInput()}
      <View style={styles.bottomButton}>
        {currentQuestionIndex > 0 && (
          <Button
            title="Back"
            onPress={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          />
        )}
        <Button title="Next" onPress={goToNextQuestion} />
        {console.log(userResponse)}
      </View>
    </View>
  );
}

/*There are many different methods to display the information, such as using .maps, FlatList, or even JSON stringify
 {JSON.stringify(userResponse, null, 3)} */
function summary({ navigation, route }) {
  const { userResponse } = route.params;
  return (
    <View>
      <View>
        {Object.entries(userResponse).map(([key, value]) => (
          <View key={key} style={{ flexDirection: "row", marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>
              Question {parseInt(key) + 1}:
            </Text>
            <Text style={{ marginLeft: 10 }}>{value}</Text>
          </View>
        ))}
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
  //stores the user's repsonses to the questions, hence the bracket
  const [userResponse, setUserResponse] = useState({});

  return (
    <View>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={startScreen} />
          <Stack.Screen
            name="questionScreen"
            children={(props) => (
              <QuestionScreen
                {...props}
                userResponse={userResponse}
                setUserResponse={setUserResponse}
              />
            )}
          />
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
    marginTop: 300,
    marginLeft: 500,
  },
});
//https://reactnative.dev/docs/checkbox
