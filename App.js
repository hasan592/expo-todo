import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import firebaseConfig from './FirebaseConfig';
import firebase from 'firebase';

var app = firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var objRef = database.ref('/obj');
export default function App() {

  useEffect(() => {
    objRef.on('value', (value) => {
      const data = value.val();
      setVal(data.z);
    });
  }, []);

  let changValueFunction = () => {
    setVal("Changed Value!")
  }
  let changeToDB = () => {
    objRef.set({
      z: input
    })
  }

  const [val, setVal] = useState("unknown");

  const [input, setInput] = useState ("unknown1");

  
  
  return (
    <View style={styles.container}>
      <Text>{val}</Text>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={changValueFunction}>Chang Value</TouchableOpacity>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setInput(text)}
        value={input}
      ></TextInput>
      <TouchableOpacity onPress={changeToDB}>Change Value To DB</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// Events (onPress in TouchableOpacity) (on Value change from firebase)
// functions can be define with 3 different syntax.
// useEffect with empty array - to execute a function once.