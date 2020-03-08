import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import HappynessStatus from '../../assets/Icons/HappynessStatus.png';
import HealthStatus from '../../assets/Icons/HealthStatus.png';
import HungryStatus from '../../assets/Icons/HungryStatus.png';
import AgeStatus from '../../assets/Icons/AgeStatus.png';


const BallStatusBar = props =>
  <View style={style.container}>
    
    <View style={style.containerStatus}>
      <View style={style.boxFeeling}>
        <Text>Feeling: </Text>
        <Text style={style.statusValue}>{props.animatedState}</Text>
      </View>

      <View style={style.boxFeeling}>
        <Image style={style.statusIcon} source={AgeStatus}/>
        <Text style={style.statusValue}>{props.age}</Text>
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
    justifyContent: 'flex-start',
  },

  containerStatus:{
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10
  },

  boxFeeling:{
    flexDirection: 'row'
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
    width: 90
  },

  dangerStatus:{
    color: '#f00',
    borderColor: '#f00'
  },




  containerBoxes:{
    flexDirection: 'row',
    display: 'none'
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