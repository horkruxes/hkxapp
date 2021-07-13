import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAQ</Text>
      <Text style={styles.subTitle}>What is this app ?</Text>
      <Text>HORKRUXES is a project whose goal is to provide a platform where everyone can express they opinions freely.</Text>
      <Text style={styles.subTitle}>How can I register ?</Text>
      <Text>There is no registration, because there are no accounts. That's right, you don't need to spoil your identity. This allows you to speak without the fear of being personnally oppressed for your opinion</Text>
      <Text style={styles.subTitle}>How can I verify if an information is correct ?</Text>
      <Text>There is no authentication, but there is a signature system.</Text>
      <Text style={styles.subTitle}>Where do the information come from ?</Text>
      <Text>On Facebook, all the information comes from facebook.com. Here, you must choose where the information come from.</Text>
      <Text style={styles.subTitle}>Can I create my own pod?</Text>
      <Text>Yes, it's the main goal of the project! But you'll need Linux knowledge, a server (any VM or a Raspberry Pi is enough), and a domain name.</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
