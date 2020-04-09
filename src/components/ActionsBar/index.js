import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import FeedButton from '../../assets/Icons/FeedButton.png';
import HealButton from '../../assets/Icons/HealButton.png';
import PlayButton from '../../assets/Icons/PlayButton.png';

/**
 * Dumb component that make the user to choose the apropriated action that he/she wants to to with the ball
 * 
 * @param {Function} props.openModalFeed onPress the feed modal will be openned
 * @param {Function} props.openHealModal onPress the healing modal will be openned
 * @param {Function} props.openGame onPress the game stack will be openned
 * 
 */
const ActionBar = props => 
  <View style={css.container}>
    <TouchableOpacity  style={css.iconBox} onPress={props.openModalFeed}>
      <Image resizeMode="cover" style={css.icon} source={FeedButton} />
    </TouchableOpacity>
    
    <TouchableOpacity style={css.iconBox} onPress={props.openHealModal}>
      <Image resizeMode="cover" style={css.icon} source={HealButton} />
    </TouchableOpacity>

    <TouchableOpacity style={css.iconBox} onPress={()=>{ props.openGame()}}>
      <Image resizeMode="cover" style={css.icon} source={PlayButton} />
    </TouchableOpacity>
  </View>

export default ActionBar;

const css = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative'
  },

  iconBox: {
    paddingHorizontal: 20
  },

  icon: {
    width: 40,
    height: 40,
  }
})