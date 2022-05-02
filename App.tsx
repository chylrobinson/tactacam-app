/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';

import {PhotoDetailsScreen, PhotoListScreen} from './src/screens';
import {RootStackParamList} from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PhotoList">
          <Stack.Screen name="PhotoDetails" component={PhotoDetailsScreen} />
          <Stack.Screen name="PhotoList" component={PhotoListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
