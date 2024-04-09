import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Diary from './src/screens/Diary';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const RootStack = createStackNavigator();

const App = () => {
  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 350);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar translucent={true} barStyle="dark-content" />
      <RootStack.Navigator>
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Register" component={Register} />
        <RootStack.Screen
          name="My Diary"
          component={Diary}
          options={{
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
