import * as React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sep from '../components/Separator'

import { Text, View } from '../components/Themed';
import { Message } from '../types';
import { Feather } from '@expo/vector-icons';
import { MessageComp } from '../components/Message';
import { cleanMessages } from '../utils/signature';

export default function TabTwoScreen() {

  let [loading, setLoading] = useState(true);
  let [messages, setMessages] = useState<Message[]>([]);
  let [sources, setSources] = useState<string[]>(['horkruxes.amethysts.studio', 'hk.quimerch.com']);

  const getOnlineData = async () => {
    setLoading(true);

    let responses: Message[] = []
    await Promise.all(sources.map((async source => {
      const url = `https://${source}/api/message`
      const response = await axios.get<Message[]>(url, {
        headers: { 'Content-Type': 'application/json' }
      })
      responses = responses.concat(response.data)
      console.log('---------\ngot', response.data, 'from', url, 'now response is', responses.length)
    })))
    console.log('ifnished')

    const newMessages = cleanMessages(responses)
    setMessages(newMessages)
    setLoading(false);
  };



  return (
    <View style={styles.container}>
      <Pressable onPress={getOnlineData}>
        <Feather name="refresh-ccw" size={18} color="grey" />
      </Pressable>
      <FlatList
        style={styles.listStyles}
        data={messages}
        keyExtractor={(item) => item.ID}
        renderItem={({ item: msg }: { item: Message }) => <MessageComp message={msg} />}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  listStyles: {
    marginHorizontal: 8,
  },
  msgAuthor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    fontWeight: 'bold',
  }
});
