import React from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';

const TheBall = props => 
  <Animated.View style={[styles.circulo, props.ballStyle, props.styleRotate]}> 
    <View style={[styles.eyeContainer, {marginTop: (props.age + 1) * 10}]}>
      <Animated.View style={[styles.eye, props.eyeStyle]} />
      <Animated.View style={[styles.eye, props.eyeStyle]} />
    </View>
  </Animated.View>;

export default TheBall;

const styles = StyleSheet.create({
  circulo: {
    height: 60,
    width: 60,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 1000,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  eyeContainer:{
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  eye: {
    height: 8,
    width: 8,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 100,
  }
});