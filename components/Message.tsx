import * as React from 'react';
import { Message } from '../types';
import { Text, View } from '../components/Themed';
import Sep from '../components/Separator'
import { Pressable, StyleSheet } from 'react-native';

const colorFromAuthor = (message: Message): string => {
    return 'blue'
}

export const MessageComp = ({
    message
}: {
    message: Message;
}) => {

    return <View>
        <View style={styles.colorBox} />
        <Text style={styles.msgAuthor}>{message.displayedName}</Text>
        <Text>{message.content}</Text>
        <Sep />
    </View>

}

const styles = StyleSheet.create({
    colorBox: {
        height: 2,
        width: 2,
        backgroundColor: 'red',
    },
    msgAuthor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        fontWeight: 'bold',
    }
});
