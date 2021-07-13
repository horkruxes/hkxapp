import * as React from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { Text, View } from '../components/Themed';
import { Message, MessageOptions } from '../types';
import { MessageComp } from '../components/Message';
import { loadMessages } from '../utils/dataLoading';

export default function MessageList({options}: {options:MessageOptions}) {

    let [refreshing, setRefreshing] = useState(false);
    let [messages, setMessages] = useState<Message[]>([]);
  
    const getOnlineData = async () => {
      const newMessages = await loadMessages(options)
      setMessages(newMessages)
      setRefreshing(false)
    };
    useEffect(() => {
      const q = () => getOnlineData()
      q()
    }, [])
  
  
  
    return (
      <View style={styles.container}>
        <FlatList
          data={messages}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={getOnlineData}
          />}
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
      backgroundColor: '#888',
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
    msgAuthor: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      fontWeight: 'bold',
    }
  });
  