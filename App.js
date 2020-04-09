import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home/';
import RPS from './src/pages/Games/RPS';

/**
 * Stack component, responsable to create the routes
 */
const AppStack = createStackNavigator();

/**
 * The App Main stack
 * 
 * Routes: 
 * Home - The component responsable to show the ball
 * Game - The game's component
 */
const App = () => 
  <NavigationContainer>
    <AppStack.Navigator headerMode='none'>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Game" component={RPS} />
    </AppStack.Navigator>
  </NavigationContainer>


export default App;
