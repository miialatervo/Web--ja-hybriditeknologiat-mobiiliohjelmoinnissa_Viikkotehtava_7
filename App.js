import { StatusBar } from 'expo-status-bar';
import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

// Define initial state for the todo list
const initialState = [];

// Reducer function to handle adding and removing tasks
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now().toString(), text: action.payload }];
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.payload);
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState('');

  function handleAddTask() {
    if (input.trim()) {
      dispatch({ type: 'ADD_TASK', payload: input });
      setInput('');
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE_TASK', payload: item.id })}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Add new..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Save" onPress={handleAddTask} color="grey"/>

      <FlatList
        data={state}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: 'grey'
  },
  input: {
    height: 40,
    borderColor: 'pink',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: 'pink'
  },
  itemText: {
    fontSize: 18,
    color: 'grey'
  },
});
