import React, { useEffect, useState } from 'react';
import {Modal, View, Text, TextInput,
        TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Picker}                                   from 'react-native-picker';
import {createTask, updateTask, deleteTask}       from '../service/Notes';
// import { text } from 'body-parser';

export default function Editor_Note({showTask, selectTask, setTaskSelect}){
    const [ category,     setCategory]     = useState('Personal');
    const [ title,        setTitle]        = useState('');
    const [ description,  setDescription]  = useState('');
    const [ modalVisible, setModalVisible] = useState(false);
    const [ refresh,      setRefresh]      = useState(false);

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
        if(selectTask.id){
            fillModal();
            setRefresh     (true);
            setModalVisible(true);
            return;

        }

        setRefresh(false);
    }, [selectTask]);

    return (
        <>
        <Modal animationType='slide' 
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(false)} }>

            <View style= {style.centerModal}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={style.modal}>
                        <Text style={style.titleModal}>    Create task      </Text>
                        <Text style={style.subtitleModal}> Title of the task</Text>

                        <TextInput style={style.inputModal}
                            onChangeText={value => setTitle(value)}
                            placeholder='Type the title of the task'
                            value={title}
                        />
                        
                        <Text style={style.subtitleModal}> Category </Text>
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


                        <Text style={style.subtitleModal}> Description of the Task </Text>
                        <TextInput style={style.inputModal}
                            multiline     = {true}
                            numberOfLines = {3}
                            onChangeText  = {newDescription => setDescription(newDescription)}
                            placeholder   = 'Type here your description'
                            value         = {description}
                        />

                        <View style={style.buttonModal}>
                            <TouchableOpacity style={style.buttonsaveModal}
                                onPress={() => refresh ? editTask() : addTask()}
                            >
                            
                            <Text style={style.buttontextModal}> Save </Text>
                            </TouchableOpacity> 

                            {
                                refresh && (
                                    <TouchableOpacity style={style.buttondeleteModal}
                                        onPress={() => { removeTask() } }>

                                        <Text style={style.buttontextModal}> Delete </Text>
                                    </TouchableOpacity>

                                )
                            }

                            <TouchableOpacity style={style.buttoncancelModal}
                                onPress={() => { clearModal()} }>
                                    
                                <Text style={style.buttontextModal}> Cancel </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>

        <TouchableOpacity onPress={() => {setModalVisible(true)} }
            style={style.viewModal}>

            <Text style={style.toviewtextModal}> + </Text>
        </TouchableOpacity>
    </>
    )
}

const style = StyleSheet.create({
    centerModal: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'

    },
    modal: {
        backgroundColor: '#fff',

        paddingHorizontal: 15,
        paddingTop: 15,

        marginTop: 8,
        marginHorizontal: 15,

        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,

        shadowColor: '#000',
        shadowOpacit: 0.4,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 0
        },

        elevation: 10

    },

    titleModal: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20

    },
    subtitleModal: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '600'

    },
    inputModal: {
        fontSize: 18,
        marginBottom: 12,

        paddingHorizontal: 4,

        borderBottomWidth: 1,
        borderBottomColor: '#ff9a94'

    },
    pickerModal:{
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 12

    },
    buttonModal: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    buttontextModal: {
        color: '#fff'

    },
    buttonsaveModal: {
        backgroundColor: '#2ea805',
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: 'center'

    },
    buttondeleteModal: {
        backgroundColor: '#d62a18',
        borderRadius: 6,
        padding: 8,
        width: 80,
        alignItems: 'center'

    },
    buttoncancelModal: {
        backgroundColor: '#057fa8',
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: 'center'

    },
    viewModal: {
        backgroundColor: "#54ba32",
        justifyContent: "center",
        position: "absolute",

        height: 64,
        width: 64,

        margin: 16,
        bottom: 0,
        right: 0,

        alignItems: "center",
        borderRadius: 9999,

        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
            shadowOffset: {
              width: 0,
              height: 2,
            },

        elevation: 4
    },
    toviewtextModal: {
        fontSize: 32,
        lineHeight: 40,
        color: "#FFFFFF"

    }

})