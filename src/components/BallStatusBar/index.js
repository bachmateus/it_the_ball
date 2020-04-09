import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import HappynessStatus from '../../assets/Icons/HappynessStatus.png';
import HealthStatus from '../../assets/Icons/HealthStatus.png';
import HungryStatus from '../../assets/Icons/HungryStatus.png';
import AgeStatus from '../../assets/Icons/AgeStatus.png';

/**
 * Dumb component that will show the status of the ball, like happyness, health, hungry and age
 * 
 * @param {*} props 
 * @param {Number} props.age
 * @param {Number} props.happyness
 * @param {Number} props.health
 * @param {Number} props.hungry
 * 
 */
const BallStatusBar = props =>
  <View style={style.container}>
    
    <View style={style.containerStatus}>
      <View style={style.boxFeeling}>
        <Text style={style.ageValue}>{props.age}</Text>
        <Image style={style.statusIcon} source={AgeStatus}/>
      </View>

    </View>

    <View style={style.containerStatus}>
      <View style={style.boxFeeling}>
        <Image style={style.statusIcon} source={HappynessStatus}/>
        <Text style={[style.statusValue, (props.happyness < 5) && style.dangerStatus]}>{('|').repeat(props.happyness * 2)}</Text>
      </View>

      <View style={style.boxFeeling}>
        <Image style={style.statusIcon} source={HealthStatus}/>
        <Text style={[style.statusValue, (props.health < 5) && style.dangerStatus]}>{('|').repeat(props.health * 2)}</Text>
      </View>

      <View style={style.boxFeeling}>
        <Image style={style.statusIcon} source={HungryStatus}/>
        <Text style={[style.statusValue, (props.hungry > 5) && style.dangerStatus]}>{('|').repeat(props.hungry * 2)}</Text>
      </View>
    </View>

  </View>;

export default BallStatusBar;

const style = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    width: '100%'
  },

  containerStatus:{
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // flexDirection: 'row',
    marginBottom: 10
  },

  boxFeeling:{
    flexDirection: 'row',
    marginBottom: 5
  },

  statusIcon: {
    width: 20,
    height: 20,
    marginRight: 5
  },

  statusValue: {
    borderColor: "#000",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: 10,
    minWidth: 100
  },

  ageValue:{
    marginRight: 10
  },

  dangerStatus:{
    color: '#f00',
    borderColor: '#f00'
  },
});