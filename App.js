import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { FlatList } from "react-native";
import { CheckBox, Input } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

let initQuotes = [
  { quote: "I am your father", title: "first quote" },
  { quote: "May the force be with you", title: "second quote" },
  { quote: "That laddie, is the sound of a dragon", title: "third quote" },
  { quote: "One ring to rule them all", title: "fourth quote" },
  {
    quote: "People linked by destiny will always find each other",
    title: "fifth quote",
  },
];

export default function App() {
  //sets this to hold 0 quotes so whatever is pulled from the randomizer will be pulled first
  const [quotes, setQuotes] = useState(null);

  const getRandomQuote = () => {
    //the first half of the code takes a random number between 1 and 0 and mulitplies it be length which is then rounded down by math.floor
    const randomIndex = Math.floor(Math.random() * initQuotes.length);
    //assigns the current quote to setQuotes
    setQuotes(initQuotes[randomIndex]);
  };

  //.quote comes from the initquotes quote property
  return (
    <View style={styles.container}>
      {quotes && <Text style={styles.quoteText}>{quotes.quote}</Text>}
      <Button
        title="Press to get random quote"
        onPress={() => {
          getRandomQuote();
        }}
      />
    </View>
  );
}
/*
steps to create quote randomizer
1. create a screen that displays 1 of the 5 quotes
2. create a button that the user will click to randomize the selection of quotes
3. design an algorithm that will randomize which quote (assign numbers and use math.random?)
4. create a shared quote button?
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
