import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Dimensions, View, } from 'react-native';

import TheBall from '../../components/theBall/';
import { connect } from 'react-redux';
import { changeAnimatedState, ResetAnimation, growBall, changeValues, changeAge, } from '../../actions/TheBallAction';

import widthAnimation from '../../stateAnimation/TheBall';
import FeedScript from '../../scripts/actionScript/FeedScript';
import { NormalScript } from '../../scripts/stateScripts/NormalScript';
import { sleepTime, maxAge } from '../../scripts/config';

import AnimationBar from '../../components/AnimationBar';
import BallStatusBar from '../../components/BallStatusBar';
import ActionsBar from '../../components/ActionsBar';
import FeedBar from '../../components/FeedBar';
import HealBar from '../../components/HealBar';
import APIAsyncStorage from '../../services/APIAsyncStorage';
import AsyncStorage from "@react-native-community/async-storage";

const Home = props => {

  const [ timeCheck, setTimeCheck ] = useState(true);
  const [ rotate ] = useState(new Animated.Value(0));
  const [ styleRotate, setStyleRotate ] = useState({transform:[{rotate: '0deg'}]});
  
  const [ modalFeed, setModalFeed ] = useState(false);
  const [ modalHeal, setModalHeal ] = useState(false);

  const [ lastUpdate, setLastUpdate ] = useState();

  useEffect(() => {
    checkState()
  }, [timeCheck] );

  // Check current state
  const checkState = () => {
    // return 
    if ( props.animatedState != 'denying')
      checkStateChange(props.animatedState);

    const params = {
      setTimeCheck: setTimeCheck,
      timeCheck: timeCheck,
      changeAnimation: changeAnimation,
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
      // normal states
      case 'normal': NormalScript(params, widthAnimation.NormalWidthAnimation); break;
      case 'sad': NormalScript(params, widthAnimation.SadWidthAnimation); break;
      case 'sleeping': NormalScript(params, widthAnimation.SleepingWidthAnimation); break;
      case 'hungry': NormalScript(params, widthAnimation.HungryWidthAnimation); break;
      case 'dead': NormalScript(params, widthAnimation.DeadWidthAnimation); break;
      case 'sick': 
        NormalScript(params, widthAnimation.SickWidthAnimation, rotate);
        
        const RotateData = rotate.interpolate({
          inputRange: [0,1],
          outputRange: ['0deg', '360deg']
        });
        
        setStyleRotate({transform:[{rotate: RotateData}]})
        
        break;
      
      // transition states
      case 'denying': 
        NormalScript(params, widthAnimation.DenyingWidthAnimation, rotate, 'transition'); 
        
        const RotateDataY = rotate.interpolate({
          inputRange: [0,1],
          outputRange: ['0deg', '45deg']
        });
        
        setStyleRotate({transform:[{rotateZ: RotateDataY}]});
        break;

    }
  }

  // Check if need to change state based on health, hungry and sad values
  const checkStateChange = (currentAnimation) => {
    const actualTime = new Date();
    checkLastUpdate(currentAnimation);

    if ( currentAnimation == 'dead' )
      return;

    if ( actualTime.getHours() < sleepTime.wakeup || actualTime.getHours() > sleepTime.sleep ) {
      changeAnimation('sleeping');
    } else if ( props.health < 5 ){ 
      changeAnimation('sick');
    } else if (props.hungry > 5){ 
      changeAnimation('hungry');
    } else if (props.happyness < 5 ){ 
      changeAnimation('sad');
    } else 
      changeAnimation('normal');
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
      
      if ( animatedState == 'sleeping') {
        wakupTheBall();
      }

      setStyleRotate({transform:[{rotate: '0deg'}]});
      props.changeAnimatedState(animatedState);
      setTimeCheck(!timeCheck)
    }
    
  }

  // Increase the balls's age and grow it
  const wakupTheBall = () => {
    if ( props.age < maxAge ) {
      props.growBall();
      props.changeAge(props.age + 1);
    }
  }

  const checkLastUpdate = (currentState) => {
    AsyncStorage.getItem(`lastUpdate`).then( (item)=>{
      setLastUpdate(item)
      
      const lastUpdate = (item) ? new Date(item) : new Date() ;
      const currentDate = new Date();
  
      const diferenceTime = ( currentDate.getTime() - lastUpdate.getTime() ) / 1000 / 60 / 60;
      console.log(diferenceTime);
      
      AsyncStorage.setItem(`lastUpdate`, currentDate.toString());
      
      if ( currentState == 'sleeping' )
        return;

      if ( Math.round(diferenceTime) >= 5 ) { // +5 hour
        changeAnimation('dead');
      }else if ( Math.round(diferenceTime) >= 3 ) { // +3 hour
        props.changeValues(10, 0 ,0);
      } else if ( Math.round(diferenceTime) >= 2 ) { // +2 hour
        props.changeValues(8, 4 ,0);
      } else if ( Math.round(diferenceTime) >= 1 ) { // +1 hour
        props.changeValues(5, 6 ,6);
      }
    });
  }

  const openModalFeed = () => {
    setModalFeed(true);
  }

  // Action of feed
  const actionFeedBall = feedType => {
    const params = {
      setNewValues: props.changeValues,
      actualValues: {
        age: props.age,
        hungry: props.hungry,
        health: props.health,
        happyness: props.happyness,
        animatedState:props.animatedState
      },
    }

    FeedScript(feedType, params);
  }

  // Action of heal
  const actionHealBall = () => {
    if ( props.health > 5 ) {
      changeAnimation('denying')
      return;
    }

    props.changeValues(props.hungry, 10 ,props.happyness)
  } 

  // Action of open heal modal
  const actionOpenHealModal = () => {
    if ( props.health > 5 ) {
      changeAnimation('denying')
      return;
    }

    setModalHeal(true);
  }

  const openGame = () => {
    props.navigation.push('Game');
  }
  return (
    <View style={styles.container}>
      <BallStatusBar animatedState={props.animatedState} health={props.health} age={props.age} hungry={props.hungry} happyness={props.happyness}/>

      <View style={styles.ballContainer}>
        <TheBall 
          width={props.AnimeWidth}
          styleRotate={styleRotate}
          ballStyle={props.AnimeStyle}
          eyeStyle={props.AnimeEyeStyle}
          age={props.age} />
      </View>
      
      <AnimationBar changeAnimation={changeAnimation} growBall={props.growBall} status={[props.health, props.hungry, props.happyness]}/>

      
      { modalFeed && <FeedBar closeModal={setModalFeed} hungryStatus={props.hungry} feedAction={actionFeedBall} changeAnimation={changeAnimation}/>}
      
      { modalHeal && <HealBar actionHealBall={actionHealBall} openHealModal={setModalHeal}/>}

      <ActionsBar openModalFeed={openModalFeed} openHealModal={actionOpenHealModal} openGame={openGame}/>
    </View>
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

const HomeConnect = connect(mapStateToProps, {changeAnimatedState, changeValues, ResetAnimation, growBall, changeAge})(Home);

export default HomeConnect;

const styles = StyleSheet.create({
  container:{
    width: Dimensions.get('window').width,    
    height: Dimensions.get('window').height,
    justifyContent:   'space-between',
    alignItems: 'center',
    // padding: 40,
    paddingVertical: 40,
    paddingHorizontal: 20,
    position: 'relative'
  },

  ballContainer:{
    // flex:1,
    justifyContent: 'center'
  }
  
});