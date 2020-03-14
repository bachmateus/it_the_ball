import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home/';
import RPS from './src/pages/Games/RPS';

const AppStack = createStackNavigator();


const App = () => 
  <NavigationContainer>
    <AppStack.Navigator headerMode='none'>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Game" component={RPS} />
    </AppStack.Navigator>
  </NavigationContainer>


export default App;
