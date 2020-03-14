import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { changeHappyness } from '../../actions/TheBallAction';

import PaperLeft from '../../assets/Game/PaperLeft.png';
import PaperRight from '../../assets/Game/PaperRight.png';
import RockLeft from '../../assets/Game/RockLeft.png';
import RockRight from '../../assets/Game/RockRight.png';
import ScissorsLeft from '../../assets/Game/ScissorsLeft.png';
import ScissorsRight from '../../assets/Game/ScissorsRight.png';
import Default from '../../assets/Game/Default.png';
import Win from '../../assets/Game/Win.png';
import Lose from '../../assets/Game/Lose.png';
import CloseButton from '../../assets/Icons/CloseButton.png';

const RPS = props => {
  
  const humanOptions = [
    { id: 0, icon: PaperLeft }, 
    { id: 1, icon: RockLeft}, 
    { id: 2, icon: ScissorsLeft}
  ];

  const ballsOptions = [
    { id: 0, icon: PaperRight }, 
    { id: 1, icon: RockRight}, 
    { id: 2, icon: ScissorsRight}
  ];
  
  const [ humanChoice, setHumanChoice ] = useState(null);
  const [ ballsChoice, setBallsChoice ] = useState(null);
  const [ resultIcon, setResultIcon] = useState(null);

  const runTheGame = choice => {
    setHumanChoice(choice);
    setBallsChoice(ballsOptions[randomChoice()])
  }

  const randomChoice = () => {
    const maxRange = 2;
    const minRange = 0;
    return parseInt((Math.random() * (maxRange - minRange + 1)), 10) + minRange;
  }

  const returnResult = () => {
    const _humanChoice = humanChoice.id;
    const _ballsChoice = ballsChoice.id;
    
    switch (_humanChoice) {
      case 0: return ( _ballsChoice == 1 ) && true; 
      case 1: return ( _ballsChoice == 2 ) && true;
      case 2: return ( _ballsChoice == 0 ) && true;
    }
  }

  const closeGame = () => {
    props.navigation.goBack()
  }

  useEffect( () => {
    if ( ballsChoice ) {
      const gameResult = returnResult();
      const _iconResult = ( gameResult === true ) ? Win : Lose;
      const newHappyness = ( gameResult === true ) ? 5 : 2;

      setResultIcon(_iconResult);
      props.changeHappyness(props.happyness + newHappyness);

      setTimeout(() => {
        setResultIcon(null);
        setHumanChoice(null);
        setBallsChoice(null);
      }, 1200);
    }

  }, [ballsChoice] );

  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButtonBox} onPress={() => {closeGame()}}> 
        <Image resizeMode="contain" style={styles.closeButton} source={CloseButton} />
      </TouchableOpacity>

      <View style={styles.result}>
        { <Image resizeMode="contain" style={styles.resultIcon} source={ (humanChoice) ? humanChoice.icon : Default} />  }
        { <Image resizeMode="contain" style={styles.resultIcon} source={ (ballsChoice) ? ballsChoice.icon : Default} />  }
      </View>

      {(resultIcon ?
        <View style={styles.optionsContainer}>
          <Image resizeMode="contain" style={styles.resultIcon} source={resultIcon} />
        </View>
      : <View style={styles.optionsContainer}>
          {humanOptions.map( (image, index) => 
            <TouchableOpacity style={styles.iconBox} key={index} onPress={ () => { runTheGame(humanOptions[index]) }}>
              <Image resizeMode="contain" style={styles.icon} source={image.icon} /> 
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}

const mapStateToProps = state => {
  return {
    happyness: state.Ball.happyness,
  }
}

const RPSConnect = connect(mapStateToProps, { changeHappyness })(RPS);

export default RPSConnect;

const styles = StyleSheet.create({

  container: {
    position: 'relative'
  },

  closeButtonBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20
  },

  closeButton:{
    width: 20,
    height: 20,
  },

  result:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    minHeight: '70%'
  },

  resultIcon:{
    width: 90,
    height: 90
  },

  optionsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    minHeight: '30%',
    alignItems:'center'
  },

  iconBox: {
    borderColor: '#000',
    borderWidth: 5,
    borderRadius: 100,
    padding: 15
  },

  icon: {
    width: 60,
    height: 60
  }
});