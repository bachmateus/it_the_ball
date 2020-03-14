import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import Pill1 from '../../assets/Icons/Pill1.png';
import Pill2 from '../../assets/Icons/Pill2.png';

const HealBar = props => {
  const pills = [Pill1, Pill2, Pill1];
  const [ totalPills, setTotalPills ] = useState(3);
  const [ pillsBox, setPillsBox ] = useState();

  useEffect(()=>{
    setPillsBox(renderPills());
  }, [totalPills]);

  const renderPills = () => {
    return pills.map( (item, index) => {
      if ( index < totalPills)
        return <Image key={index}  style={style.pillIcon} source={item}/>
    });
  }
  
  const takeAPill = () => {
    const newTotalPills = totalPills - 1;
    setTotalPills(newTotalPills);

    if ( newTotalPills <= 0) {
      setTotalPills(3);
      props.actionHealBall();
      props.openHealModal(false);
    }
  } 

  return (
    <View style={style.container}>
      <View style={style.pillsBox}>
        {pillsBox}
      </View>

      <TouchableOpacity style={style.drinkBox} onPress={()=>{takeAPill()}}>
        <Image source={Pill1} style={style.icon} />
      </TouchableOpacity> 
    </View>)
};

export default HealBar;

const style = StyleSheet.create({
  container:{
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  drinkBox:{
    position: 'relative',
    borderColor: '#000',
    borderWidth: 5,
    borderRadius: 100,
    padding: 30,
  },

  pillsBox: {
    height: '50%',
    flexDirection: 'row'
  },

  pillIcon: {
    width: 40,
    height: 40
  },

  icon: {
    width: 100,
    height: 100
  }
});