import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Text } from 'react-native';

// import MilkForBaby from '../../assets/Icons/MilkForBaby.png';
// import EatMeat from '../../assets/Icons/EatMeat.png';
import Food from '../../assets/Food';

import CloseButton from '../../assets/Icons/CloseButton.png';

const FeedBar = props => {

  const [ isEating, setIsEating ] = useState(false);
  const [ foodEating, setFoodEating ] = useState({});
  const [ bittenPart, setBittenPart ] = useState(0);

  const eatTheFood = () => {
    const newBittenPart = bittenPart + 20;
    setBittenPart(newBittenPart);

    if ( newBittenPart >= 100 ) {
      setIsEating(false);
      props.feedAction(foodEating.name);
    }
  }

  const startToEat = food => {
    if ( props.hungryStatus < 2 ) {
      props.changeAnimation('denying');
      setIsEating(false);
      setFoodEating("");
      setBittenPart(0)
    } else {
      setIsEating(true);
      setFoodEating(food);
      setBittenPart(0);
    }

  }

  return <View style={styles.container}>

    { ( !isEating ) 
      ? <TouchableOpacity style={styles.closeBox} onPress={()=>{props.closeModal(false)}} />
      : <View style={styles.eatingContainer}>
          <TouchableOpacity onPress={()=>{eatTheFood();}}>
            <View style={styles.iconEatingBox}>
              <Image style={styles.iconEating} source={foodEating.icon} />
              <View style={[styles.eatenPart, {width:bittenPart}]} />
            </View>
          </TouchableOpacity>
          
            
        </View>
    }

    <View style={styles.actionContainer}>

      <TouchableOpacity style={styles.boxIcon} onPress={()=>{props.closeModal(false)}}>
        <Image style={styles.icon} source={CloseButton} />
      </TouchableOpacity>

      { Food.map( item => { 
        return <TouchableOpacity key={item.id} style={styles.boxIcon} onPress={()=>startToEat(item)}>
          <Image style={styles.icon} source={item.icon} />
        </TouchableOpacity>} ) }
        
    </View>
  </View>
}

export default FeedBar;

const styles = StyleSheet.create({
  container:{
    position:'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 2
  },

  closeBox: {
    // backgroundColor:'#fff',
    width: '75%',
    height: '100%'
  },

  eatingContainer:{
    width: '100%',
    backgroundColor:'#fff',
    justifyContent: "center",
    alignItems: "center"
  },

  iconEatingBox:{
    position: 'relative'
  },

  eatenPart:{
    backgroundColor: '#fff',
    position: 'absolute',
    height: 100
  },

  iconEating:{
    width:100,
    height: 100
  },

  actionContainer: {
    width: '25%',
    backgroundColor:'rgba(1,1,1, 0.16)',
  },

  boxIcon: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  icon:{
    width:40,
    height: 40
  }

});