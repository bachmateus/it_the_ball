import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Dimensions, View, } from 'react-native';

import TheBall from '../../components/theBall/';
import { connect } from 'react-redux';
import { changeAnimatedState, ResetAnimation, growBall, changeValues } from '../../actions/TheBallAction';

import { NormalWidthAnimation } from '../../stateAnimation/TheBall/Normal';
import { SadWidthAnimation } from '../../stateAnimation/TheBall/Sad';
import { SleepingWidthAnimation } from '../../stateAnimation/TheBall/Sleeping';
import { DeadWidthAnimation } from '../../stateAnimation/TheBall/Dead';
import { SickWidthAnimation } from '../../stateAnimation/TheBall/Sick';
import { HungryWidthAnimation } from '../../stateAnimation/TheBall/Hungry';

import AnimationBar from '../../components/AnimationBar';
import BallStatusBar from '../../components/BallStatusBar';
import { NormalScript } from '../../scripts/stateScripts/NormalScript';

const Home = props => {

  const [ timeCheck, setTimeCheck ] = useState(true);
  const [ rotate ] = useState(new Animated.Value(0));
  const [ styleRotate, setStyleRotate ] = useState({transform:[{rotate: '0deg'}]});
  
  useEffect(() => {
    checkState()
  }, [timeCheck] )

  // Check current state
  const checkState = () => {
    checkStateChange(props.animatedState);

    const params = {
      setTimeCheck: setTimeCheck,
      timeCheck: timeCheck,
      setNewValues: props.changeValues,
      actualValues: {
        age: props.age,
        hungry: props.hungry,
        health: props.health,
        happyness: props.happyness,
        animatedState:props.animatedState
      },
      styleAnimation: {
        ball: props.AnimeStyle,
        eye: props.AnimeEyeStyle,
        defaultBody: props.defaultBody
      }
    }

    switch (props.animatedState) {
      case 'normal': NormalScript(params, NormalWidthAnimation); break;
      case 'sad': NormalScript(params, SadWidthAnimation); break;
      case 'sleeping': NormalScript(params, SleepingWidthAnimation); break;
      case 'hungry': NormalScript(params, HungryWidthAnimation); break;
      case 'dead': NormalScript(params, DeadWidthAnimation); break;
      case 'sick': 
        NormalScript(params, SickWidthAnimation, rotate);
        
        const RotateData = rotate.interpolate({
          inputRange: [0,1],
          outputRange: ['0deg', '360deg']
        });
        
        setStyleRotate({transform:[{rotate: RotateData}]})
        
        break;

    }
  }

  // Check if need to change state based on health, hungry and sad values
  const checkStateChange = (activeState) => {

    if ( activeState != 'normal') {
      changeAnimation(activeState);
      return;
    }

    if ( props.health < 5 ) 
      changeAnimation('sick');
      
    else if (props.hungry > 5) 
      changeAnimation('hungry');
    
    else if (props.happyness < 5 ) 
      changeAnimation('sad');

  }

  // Change the state
  const changeAnimation = (animatedState) => {
    if ( animatedState != props.animatedState ) {
      props.ResetAnimation({
        width:props.defaultBody.width,
        height:props.defaultBody.height,
        eye: {
          width:props.defaultBody.eye.width,
          height:props.defaultBody.eye.height,    
        }
      });
      
      setStyleRotate({transform:[{rotate: '0deg'}]});
      props.changeAnimatedState(animatedState);
      setTimeCheck(!timeCheck)
    }
    
  }

  return (
    <Animated.View style={styles.container}>
      <BallStatusBar animatedState={props.animatedState} health={props.health} age={props.age} hungry={props.hungry} happyness={props.happyness}/>

      <View style={styles.ballContainer}>
        <TheBall 
          width={props.AnimeWidth}
          styleRotate={styleRotate}
          ballStyle={props.AnimeStyle}
          eyeStyle={props.AnimeEyeStyle} />
      </View>
      
      <AnimationBar changeAnimation={changeAnimation} growBall={props.growBall}/>
    </Animated.View>
  );
};


const mapStateToProps = state => {
  return {
    age: state.Ball.age,
    health: state.Ball.health,
    hungry: state.Ball.hungry,
    happyness: state.Ball.happyness,


    animatedState: state.Ball.animatedState,
    AnimeStyle: state.BallAnime.style,
    AnimeEyeStyle: state.BallAnime.eyeStyle,
    defaultBody: state.Ball.body
  }
}

const HomeConnect = connect(mapStateToProps, {changeAnimatedState, changeValues, ResetAnimation, growBall, SadWidthAnimation})(Home);

export default HomeConnect;

const styles = StyleSheet.create({
  container:{
    width: Dimensions.get('window').width,    
    height: Dimensions.get('window').height,
    justifyContent:   'space-between',
    alignItems: 'center',
    padding: 40
  },

  ballContainer:{
    // flex:1,
    justifyContent: 'center'
  }
  
});