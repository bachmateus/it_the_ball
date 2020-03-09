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
    const newBittenPart = bittenPart + 25;
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
          <TouchableOpacity style={styles.iconEatingBox} onPress={()=>{eatTheFood();}}>
            <View>
              <Image style={styles.iconEating} source={foodEating.icon} />
              <View style={[styles.eatenPart, {width:bittenPart}]} />
            </View>
          </TouchableOpacity>
        </View>
    }

    <View style={styles.actionContainer}>

      {/* <TouchableOpacity style={styles.boxIcon} onPress={()=>{props.closeModal(false)}}>
        <Image style={styles.icon} source={CloseButton} />
      </TouchableOpacity> */}

      { Food.map( item => { 
        return <TouchableOpacity key={item.id} style={styles.boxIcon} onPress={()=>startToEat(item)}>
          <Image style={styles.icon} source={item.icon} />
        </TouchableOpacity>} ) }
        
    </View>
  </View>
}

export default FeedBar;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container:{
    position:'absolute',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'space-between',
    // flexDirection: 'row',
    zIndex: 3
  },

  closeBox: {
    // backgroundColor:'#f00',
    width: windowWidth,
    height: '75%',
    // display: 'none'
  },

  eatingContainer:{
    width: windowWidth,
    height: windowHeight,
    backgroundColor:'#fff',
    justifyContent: "center",
    alignItems: "center",
    // zIndex: 0
  },

  iconEatingBox:{
    position: 'relative',
    borderColor: '#000',
    borderWidth: 5,
    borderRadius: 100,
    padding: 30
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
    width: windowWidth,
    // height: '20%',
    backgroundColor:'#fff',
    justifyContent: 'center',
    marginBottom: 120,
    flexDirection: 'row',
    alignItems: 'flex-end',
    // paddingBottom:20, 
    zIndex: 6,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    borderTopColor: '#000',
    borderTopWidth: 1,
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