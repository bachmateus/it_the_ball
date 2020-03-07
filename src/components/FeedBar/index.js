import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

import MilkForBaby from '../../assets/Icons/MilkForBaby.png';
import EatMeat from '../../assets/Icons/EatMeat.png';
import CloseButton from '../../assets/Icons/CloseButton.png';

const FeedBar = props => {

  return <View style={styles.container}>
    <TouchableOpacity style={styles.closeBox} onPress={()=>{props.closeModal(false)}} />

    <View style={styles.actionContainer}>
      <TouchableOpacity style={styles.boxIcon} onPress={()=>{props.closeModal(false)}}>
        <Image style={styles.icon} source={CloseButton} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.boxIcon} onPress={()=>props.feedAction('milk')}>
        <Image style={styles.icon} source={MilkForBaby} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.boxIcon} onPress={()=>props.feedAction('meat')}>
        <Image style={styles.icon} source={EatMeat} />
      </TouchableOpacity>
    </View>
  </View>
}

export default FeedBar;

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'rgba(0,0,0, 0.16)',
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