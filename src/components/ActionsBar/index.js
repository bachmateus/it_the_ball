import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import FeedButton from '../../assets/Icons/FeedButton.png';
import HealButton from '../../assets/Icons/HealButton.png';
import PlayButton from '../../assets/Icons/PlayButton.png';

const ActionBar = props => 
  <View style={css.container}>
    <TouchableOpacity  style={css.iconBox} onPress={props.openModalFeed}>
      <Image style={css.icon} source={FeedButton} />
    </TouchableOpacity>
    
    <TouchableOpacity style={css.iconBox} onPress={props.openHealModal}>
      <Image style={css.icon} source={HealButton} />
    </TouchableOpacity>

    <TouchableOpacity style={css.iconBox} onPress={()=>alert('play')}>
      <Image style={css.icon} source={PlayButton} />
    </TouchableOpacity>
  </View>

export default ActionBar;

const css = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative'
    // zIndex: 1
  },

  iconBox: {
    paddingHorizontal: 20
  },

  icon: {
    width: 40,
    height: 40,
    // zIndex: 1
  }
})