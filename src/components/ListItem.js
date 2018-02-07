import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListItem = (props) => { // const ListItem = ({ item, onItemPress }) => {
    // const or let { title } = item;
    return(
        <TouchableOpacity style={styles.itemStyle} onPress={() => props.onItemPress(props.item.id)}>
            <Text>{props.item.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemStyle: {
        marginBottom: 10
    }
});

export default ListItem;