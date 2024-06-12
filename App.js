import Picker from 'react-native-picker';
import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import Editor_Note from "./src/component/Editor_Note";
import Task        from "./src/component/Note";
import { createTable, selectTask } from './src/service/Notes';

export default function App() {
  const [ task,       setTask ]       = useState([]);
  const [ selectTasks,setSelectTask ] = useState([]);
  const [ category,   setCategory]    = useState('*');

  useEffect(() => {
    createTable();

  }, []);

  useEffect(() => {
    async function startTask() {
      await viewTask();

    }

    startTask();
  }, [category]);

  async function viewTask(){
    const tasks = await selectTask(category);
    setTask(tasks);

  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.pickerModal}>
        <Picker selectedValue = {category}
          onValueChange = {(itemValue) => setCategory(itemValue)}
        >

          <Picker.Item Label = "Personal" value="Personal"/>
          <Picker.Item Label = "Work"     value="Work"/>
          <Picker.Item Label = "School"   value="School"/>
          <Picker.Item Label = "Others"   value="Others"/>
        </Picker>
      </View>

      <FlatList data={task}
        renderItem = {({item}) => (
          <Task item={item} setSelectTask={setSelectTask} />
        )}
        keyExtractor = {(task) => task.id}
      />
      
      <Editor_Note showTask={showTask}
        selectTasks   = {selectTasks}
        setSelectTask = {setSelectTask}
      />      
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  pickerModal: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#eee',
    margin: 10,
  },
});
