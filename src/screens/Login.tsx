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
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<any>();

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    try {
      if (password === '' && email === '') {
        Alert.alert('Please insert your email and password');
        return;
      } else if (password === '') {
        Alert.alert('Please insert your password');
        return;
      } else if (email === '') {
        Alert.alert('Please insert your email');
        return;
      }

      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      if (userCredential) {
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      let errorMessage = 'Failed to login';
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
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
          <Text style={styles.buttonTextLogin}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={handleRegisterPress}>
          <Text style={styles.buttonTextRegister}>
            New to Memori? Sign Up here!
          </Text>
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
  buttonLogin: {
    backgroundColor: '#006565',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonRegister: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonTextLogin: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonTextRegister: {
    color: '#006565',
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
