import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NavBar from './components/navbar';
import RegistrationScreen from './screens/registration_screen';
import LoginScreen from './screens/login_screen';

const Stack = createNativeStackNavigator();

const App = () => {
  //comment
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={RegistrationScreen}
          name="Registrations"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={LoginScreen}
          name="Login"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={NavBar}
          name="NavBar"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
