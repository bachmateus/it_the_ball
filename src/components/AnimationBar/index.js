import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AnimationBar = props =>
  <View>
    <View style={style.container}>
      <TouchableOpacity style={style.button} onPress={() => props.changeAnimation('normal') }>
        <Text>Normal</Text>  
      </TouchableOpacity>

      <TouchableOpacity style={style.button} onPress={() => props.changeAnimation('sick') }>
        <Text>Doente</Text>  
      </TouchableOpacity>

      <TouchableOpacity style={style.button} onPress={() => props.changeAnimation('hungry') }>
        <Text>Fome</Text>  
      </TouchableOpacity>

      <TouchableOpacity style={style.button} onPress={() => props.changeAnimation('sleeping') }>
        <Text>Dormindo</Text>  
      </TouchableOpacity>

      <TouchableOpacity style={style.button} onPress={() => props.changeAnimation('dead') }>
        <Text>Morto</Text>  
      </TouchableOpacity>
    </View>

    <View style={style.container}>
      <TouchableOpacity style={style.button} onPress={() => props.changeAnimation('sad') }>
        <Text>Triste</Text>  
      </TouchableOpacity>

      <TouchableOpacity style={style.button} onPress={() => props.changeAnimation('happy') }>
        <Text>Feliz</Text>  
      </TouchableOpacity>
    </View>

    <TouchableOpacity style={style.button} onPress={() => props.growBall() }>
      <Text>Crescer</Text>  
    </TouchableOpacity>
  </View>;

export default AnimationBar;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    margin:5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "#000",
    borderWidth: 1
  }
});