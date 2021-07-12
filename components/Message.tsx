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

    return <View style={styles.main}>
        <View style={{
            height: 3,
            width: '100%',
            backgroundColor: message.Color,
        }} />
        <View style={styles.content}>
            <Text style={styles.msgAuthor}>{message.displayedName}</Text>
            <Text>{message.content}</Text>
        </View>
    </View>

}

const styles = StyleSheet.create({
    main: {
        marginVertical: 4,
    },
    content: {
        paddingHorizontal: 8,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorBox: {
        height: 10,
        width: '100%',
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
