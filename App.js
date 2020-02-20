/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import Voice from 'react-native-voice';
import { NeuButton, NeuView } from "neumorphism-ui";


const WINDOW_HEIGHT = Dimensions.get('window').height;

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      inputValue: '',
    };
        
    Voice.onSpeechStart = this.onSpeechStart.bind(this)
    Voice.onSpeechResults = this.onSpeechResults.bind(this) 
  }

  onSpeechStart() {
    this.setState({isRecording: true});
  }

  onSpeechResults(e) {
    const result = e.value[0];
    this.setState({inputValue: result})
  }

  handleStartRecording = async () => {
    await Voice.start('en-US');
  };

  handleStopRecording = async () => {
    this.setState({isRecording: false});
    await Voice.stop();
  };

  render() {
    const {inputValue, isRecording} = this.state;

    return (
      <View style={styles.container}>
        <NeuView pressed style={styles.inputWrapper}>
          <TextInput
            autoFocus={false}
            value={inputValue}
            style={styles.input}
            textAlignVertical="top"
            placeholder="Start recording and dictating..."
            multiline
          />
        </NeuView>
        <NeuButton style={styles.button}
          onPress={this.handleStartRecording}
          onUnpress={this.handleStopRecording}
        >
          <Text style={styles.btnLabel}>
          {isRecording ? 'STOP' : 'RECORD'}
        </Text>
      </NeuButton>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor:'#e0e5ec'
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  inputWrapper: {
    marginBottom: 'auto',
    height: WINDOW_HEIGHT / 3,
  },
  input: {
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0)',
    height: '90%',
    margin: 20,
    padding: 20,
    color: 'rgba(0,0,0,0.7)',
    fontSize: 15,
  },
  btnLabel: {
    opacity: 0.7,
  },
});
