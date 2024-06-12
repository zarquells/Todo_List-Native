import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function Note({item, setTaskSelect}) {
    const categories = {
        Personal : '#ff924f',
        Work:      '#2f71eb',
        School:    'black',
        Others:    '#00911f'
    };

    const styles = styleFunction(categories[item.category]);

    return(
        <TouchableOpacity style={styles.card} onPress={() => setTaskSelect(item)}>
            <Text style={styles.title}>       {item.title}      </Text>
            <Text style={styles.category}>    {item.category}   </Text>
            <Text style={styles.description}> {item.description}</Text>
        </TouchableOpacity>
    );
};

const styleFunction = (color) => {StyleSheet.create({
    card: {
        borderRadius:      8,
        backgroundColor:   '#fff',

        paddingVertical:   8,
        paddingHorizontal: 16,

        marginHorizontal:  16,
        marginBottom:      8,

        borderTopWidth:    5,
        borderColor:       color,

        shadowColor:       '#000',
        shadowOpacity:     0.20,
        shadowRadius:      3,
        shadowOffset: {
            width:  0,
            height: 2
        },

        elevation:         4

    },
    title: {
        fontSize:          24,
        fontWeight:        '700',
        marginBottom:      4

    },
    category: {
        borderRadius:      4,
        backgroundColor:   color,
        padding:           5,
        color:             '#fafafa',
        alignSelf:         'flex-start'

    },
    description: {
        lineHeight: 24
        
    }
})}

export default Note;