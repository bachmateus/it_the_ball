import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BallStatusBar = props =>
  <View style={style.container}>
    <Text>
      {props.animatedState}
    </Text>

    <View style={style.containerBoxes}>
      <View style={style.button}>
        <Text>Saúde  </Text>  
        <Text>{(props.health).toFixed(2)}</Text>  
      </View>

      <View style={style.button}>
        <Text>Idade  </Text>  
        <Text>{(props.age).toFixed(2)}</Text>  
      </View>

      <View style={style.button}>
        <Text>Fome  </Text>  
        <Text>{(props.hungry).toFixed(2)}</Text>  
      </View>

      <View style={style.button}>
        <Text>Felicidade  </Text>  
        <Text>{(props.happyness).toFixed(2)}</Text>  
      </View>
    </View>
  </View>;

export default BallStatusBar;

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerBoxes:{
    flexDirection: 'row'
  }, 

  button: {
    flexDirection: 'row',
    margin:5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "#000",
    borderWidth: 1
  }
});