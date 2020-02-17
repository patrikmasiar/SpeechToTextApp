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
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import Voice from 'react-native-voice';

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
        <TextInput
          autoFocus={false}
          value={inputValue}
          style={styles.input}
          textAlignVertical="top"
          placeholder="Start recording..."
          multiline
        />
        <View>
          <TouchableOpacity
            style={[styles.btn, isRecording && styles.btnRecording]}
            activeOpacity={0.7}
            onPress={isRecording ? this.handleStopRecording : this.handleStartRecording}
          >
            <Text style={styles.btnLabel}>
              {isRecording ? 'STOP' : 'RECORD'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#f5f5f5',
    marginTop: 20,
    marginBottom: 'auto',
    height: WINDOW_HEIGHT / 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    color: 'gray',
    fontSize: 15,
  },
  btnLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#4caf50',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowOpacity: 0.6,
    elevation: 6,
    shadowColor: '#444',
    shadowRadius: 2,
    shadowOffset: {
        height: 2,
    },
  },
  btnRecording: {
    backgroundColor: '#f44336',
  },
});
