import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const handleRegister = async () => {
    try {
      if (password !== confirmedPassword) {
        Alert.alert(
          'Passwords do not match',
          'Please enter matching passwords.',
        );
        return;
      } else if (password === '' && email === '') {
        Alert.alert('Please insert your email and password');
        return;
      } else if (password === '') {
        Alert.alert('Please insert your password');
        return;
      } else if (email === '') {
        Alert.alert('Please insert your email');
        return;
      } else {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        if (userCredential) {
          setEmail('');
          setPassword('');
          setConfirmedPassword('');
        }
      }
    } catch (error) {
      let errorMessage = 'Failed to Register';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      Alert.alert('Login Failed', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require('../assets/placeholders/diary.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Memori</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirmedPassword}
          onChangeText={text => setConfirmedPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F0F7F7',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#006565',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#006565',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: 242,
    height: 215,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 40,
  },
});
