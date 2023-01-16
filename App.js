import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NavBar from './components/navbar';
import RegistrationScreen from './screens/registration_screen';
import LoginScreen from './screens/login_screen';
import UserInfoScreen from './screens/user_info_screen';
import SettingsScreen from './screens/settings';
import VoiceSelectionScreen from './screens/voiceSelection_screen';
import FolderScreen from './screens/folder_screen';

import {ThemesContext, themes} from './styles/color_themes';

const Stack = createNativeStackNavigator();

const App = () => {
  const [colorTheme, setColorTheme] = useState({
    theme: themes.light,
    toggleTheme: newTheme => {
      setColorTheme({
        ...colorTheme,
        theme: newTheme,
      });
    },
  });

  return (
    <ThemesContext.Provider value={colorTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={LoginScreen}
            name="Login"
            options={{headerShown: false}}
          />
          <Stack.Screen
            component={RegistrationScreen}
            name="Registration"
            options={{headerShown: false}}
          />
          <Stack.Screen
            component={UserInfoScreen}
            name="UserInfo"
            options={{headerShown: false}}
          />
          <Stack.Screen
            component={NavBar}
            name="NavBar"
            options={{headerShown: false}}
          />
          <Stack.Screen
            component={SettingsScreen}
            name="Settings"
            options={{headerShown: false}}
          />
          <Stack.Screen
            component={VoiceSelectionScreen}
            name="VoiceSelection"
            options={{headerShown: false}}
          />
          <Stack.Screen
            component={FolderScreen}
            name="Folder"
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemesContext.Provider>
  );
};

export default App;
