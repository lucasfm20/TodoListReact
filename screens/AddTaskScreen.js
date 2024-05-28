import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid'; 

const AddTaskScreen = ({ navigation }) => {
  const [task, setTask] = useState('');

  const handleAddTask = async () => {
    if (task.trim()) {
      const newTask = { id: uuidv4(), title: task };
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const tasks = storedTasks ? JSON.parse(storedTasks) : [];
        tasks.push(newTask);
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        setTask('');
        navigation.navigate('Menu');
      } catch (error) {
        console.error('Falha ao salvar a task.', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite a task..."
        value={task}
        onChangeText={setTask}
      />
      <Button title="Adicionar task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddTaskScreen;
