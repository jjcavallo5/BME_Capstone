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
import AddCommandScreen from './screens/addCommand_screen';
import AddFolderScreen from './screens/addFolder_screen';
import SelectIconScreen from './screens/selectIcon_screen';

import {themes} from './styles/color_themes';
import RNTTSvoices from './backend/RNTTS_voices';
import {
  defaultCategoryList,
  defaultCommandList,
} from './components/default_commands';
import AppContext from './components/appContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const [context, setContext] = useState({
    categories: defaultCategoryList,
    commands: defaultCommandList,
    voice: {category: 'RNTTS', data: RNTTSvoices[0].data},
    theme: themes.light,
    firstName: '',
    lastName: '',
    chronologicalAge: 0,
    cognitiveAge: 0,

    updateContext: newContext => setContext(newContext),
  });

  return (
    <AppContext.Provider value={context}>
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
          <Stack.Screen
            component={AddCommandScreen}
            name="AddCommand"
            options={{headerShown: false}}
          />
          <Stack.Screen
            component={AddFolderScreen}
            name="AddFolder"
            options={{headerShown: false}}
          />
          <Stack.Screen
            component={SelectIconScreen}
            name="SelectIcon"
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
