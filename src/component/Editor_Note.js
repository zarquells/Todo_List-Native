import React, { useEffect }                                      from 'react';
import {Modal, View, Text, TextInput,
        TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Picker}                                   from 'react-native-picker';
import {createTask, updateTask, deleteTask}       from '../service/Notes';
import { text } from 'body-parser';

export default function Editor_Note({showTask, selectTask, setTaskSelect}){
    const [ category, setCategory]         = useState('Personal');
    const [ title, setTitle]               = useState('');
    const [ description, setDescription]   = useState('');
    const [ modalVisible, setModalVisible] = useState(false);
    const [ refresh, setRefresh]           = useState(false);

    async function addTask(){
        const task = {
            title: title,
            category: category,
            description: description
        }

        await createTask(task);
        showTask();
        clearModal(); 

    }

    async function editTask(){
        const task = {
            id: selectTask.id,
            title: title,
            category: category,
            description: description
        }

        await updateTask(task);
        showTask();
        clearModal(); 

    }

    async function removeTask(){
        await deleteTask(selectTask.id);
        showTask();
        clearModal(); 

    }

    function fillModal(){
        setTitle      (selectTask.title);
        setCategory   (selectTask.category);
        setDescription(selectTask.description);

    }

    function clearModal(){
        setTitle       ('');
        setCategory    ('Personal');
        setDescription ('');
        setTaskSelect  ({});
        setModalVisible(false);

    }

    useEffect(() => {
        fillModal();
        setRefresh     (true);
        setModalVisible(true);

        return
    }, [selectTask])

    return (
        <View>
            
        </View>
    )
}