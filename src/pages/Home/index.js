import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Dimensions, View, } from 'react-native';

import TheBall from '../../components/theBall/';
import { connect } from 'react-redux';
import { changeAnimatedState, ResetAnimation, growBall, changeValues } from '../../actions/TheBallAction';

import widthAnimation from '../../stateAnimation/TheBall';
import FeedScript from '../../scripts/actionScript/FeedScript';
import { NormalScript } from '../../scripts/stateScripts/NormalScript';

import AnimationBar from '../../components/AnimationBar';
import BallStatusBar from '../../components/BallStatusBar';
import ActionsBar from '../../components/ActionsBar';
import FeedBar from '../../components/FeedBar';

const Home = props => {

  const [ timeCheck, setTimeCheck ] = useState(true);
  const [ rotate ] = useState(new Animated.Value(0));
  const [ styleRotate, setStyleRotate ] = useState({transform:[{rotate: '0deg'}]});
  
  const [ modalFeed, setModalFeed ] = useState(false);

  useEffect(() => {
    checkState()
  }, [timeCheck] )

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
  const checkStateChange = () => {
    const actualTime = new Date();

    if ( false && actualTime.getHours() > 16 || actualTime.getHours() < 8 ) {
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
      
      setStyleRotate({transform:[{rotate: '0deg'}]});
      props.changeAnimatedState(animatedState);
      setTimeCheck(!timeCheck)
    }
    
  }

  const openModalFeed = () => {
    setModalFeed(true);
  }

  // Action of feed
  const actionFeedBall = feedType => {
    if ( props.hungry < 2 ) {
      changeAnimation('denying')
      return;
    }

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
      
      {/* <AnimationBar changeAnimation={changeAnimation} growBall={props.growBall}/> */}

      { ( modalFeed ) && <FeedBar closeModal={setModalFeed} feedAction={actionFeedBall}/>}
      
      <ActionsBar openModalFeed={openModalFeed} actionHealBall={actionHealBall}/>
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

const HomeConnect = connect(mapStateToProps, {changeAnimatedState, changeValues, ResetAnimation, growBall})(Home);

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