import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Diary from './src/screens/Diary';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import LogoutButton from './src/components/Buttons/LogoutButton';

const RootStack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setTimeout(() => SplashScreen.hide(), 350);
      } else {
        setUser(null);
      }
      setInitializing(false);
    });

    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar translucent={true} barStyle="dark-content" />
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F0F7F7',
          },
          headerTintColor: '#006565',
        }}>
        {user ? (
          <RootStack.Screen
            name="Memori"
            component={Diary}
            options={{
              headerRight: () => <LogoutButton />,
            }}
          />
        ) : (
          <>
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen
              name="Register"
              options={{title: 'Sign Up to Memori'}}
              component={Register}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
