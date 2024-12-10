import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { FlatList } from "react-native";
import { CheckBox, Input } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

let initTasks = [
  { description: "Task 1", completed: true, key: "1" },
  { description: "Task 2", completed: false, key: "2" },
];

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(initTasks);

  const updateTask = (taskToUpdate) => {
    const updatedTasks = tasks.map((task) => {
      if (task.key === taskToUpdate.key) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const addTask = () => {
    const maxKey = Math.max(...tasks.map((task) => Number(task.key)), 0) + 1;
    setTasks([
      ...tasks,
      {
        description: input,
        completed: false,
        key: maxKey.toString(),
      },
    ]);
    setInput("");
  };

  const renderItem = ({ item }) => {
    return (
      <CheckBox
        title={item.description}
        checked={item.completed}
        onPress={() => updateTask(item)}
        iconType="material-community"
        checkedIcon={
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={24}
            color="green"
          />
        }
        uncheckedIcon="checkbox-blank-outline"
        textStyle={
          item.completed
            ? {
                textDecorationLine: "line-through",
                textDecorationStyle: "solid",
              }
            : {}
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key.toString()}
      />
      <View style={styles.horizontal}>
        <Input
          onChangeText={setInput}
          value={input}
          placeholder="...Enter task"
        />
        <Button onPress={addTask} title="Add Task" />
      </View>
    </View>
  );
}

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
});
//https://reactnative.dev/docs/checkbox
