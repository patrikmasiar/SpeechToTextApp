import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import Voice from 'react-native-voice';
import {NeuButton, NeuView} from "neumorphism-ui";

const WINDOW_HEIGHT = Dimensions.get('window').height;

const App = () => {
  const [isRecording, setRecording] = useState(false);
  const [inputValue, setInputValue] = useState('');

  Voice.onSpeechStart = () => setRecording(true);
  Voice.onSpeechResults = (e) => setInputValue(e.value[0]);

  const handleStartRecording = async () => {
    await Voice.start('en-US');
  };

  const handleStopRecording = async () => {
    setRecording(false);
    await Voice.stop();
  };

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
        onPress={handleStartRecording}
        onUnpress={handleStopRecording}
      >
        <Text style={styles.btnLabel}>
          {isRecording ? 'STOP' : 'RECORD'}
        </Text>
      </NeuButton>
    </View>
  )
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

export default App;
