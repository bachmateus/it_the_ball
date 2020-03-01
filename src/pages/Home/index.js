import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Dimensions, Text, View,TouchableOpacity } from 'react-native';

import TheBall from '../../components/theBall/';
import { connect } from 'react-redux';
import { changeAnimatedState, ResetAnimation } from '../../actions/TheBallAction';

import { NormalWidthAnimation } from '../../stateAnimation/TheBall/Normal';
import { SadWidthAnimation } from '../../stateAnimation/TheBall/Sad';
import { SleepingWidthAnimation } from '../../stateAnimation/TheBall/Sleeping';
import { DeadWidthAnimation } from '../../stateAnimation/TheBall/Dead';
import { SickWidthAnimation } from '../../stateAnimation/TheBall/Sick';
import { HungryWidthAnimation } from '../../stateAnimation/TheBall/Hungry';

import AnimationBar from '../../components/AnimationBar';

const Home = props => {

  const [ timeCheck, setTimeCheck ] = useState(true);
  const [ rotate ] = useState(new Animated.Value(0));
  const [ styleRotate, setStyleRotate ] = useState({transform:[{rotate: '0deg'}]});
  
  useEffect(() => {
    checkState()
  }, [timeCheck] )

  const checkState = () => {
    // console.log('checkState: ' + props.animatedState);
    
    const styleAnimation = {
      ball: props.AnimeStyle,
      eye: props.AnimeEyeStyle,
      defaultBody: props.defaultBody
    };
    setStyleRotate({transform:[{rotate: '0deg'}]})

    switch (props.animatedState) {
      case 'normal':
         NormalWidthAnimation(styleAnimation, () => { setTimeCheck(!timeCheck)})
        break;
      
      case 'sad':
        SadWidthAnimation(styleAnimation, () => { setTimeCheck(!timeCheck)});
        break;
      
      case 'sleeping':
        SleepingWidthAnimation(styleAnimation, () => { setTimeCheck(!timeCheck)});
        break;

      case 'hungry':
        HungryWidthAnimation(styleAnimation, () => { setTimeCheck(!timeCheck)});
        break;

      case 'sick':
        SickWidthAnimation(styleAnimation, rotate, () => { setTimeCheck(!timeCheck)});
        
        const RotateData = rotate.interpolate({
          inputRange: [0,1],
          outputRange: ['0deg', '180deg']
        });
        setStyleRotate({transform:[{rotate: RotateData}]})
        
        break;
        
      case 'dead':
        DeadWidthAnimation(styleAnimation, () => { setTimeCheck(!timeCheck)});
        break;
      default:
        break;
    }
  }

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
      
      props.changeAnimatedState(animatedState);
      setTimeCheck(!timeCheck)
    }
    
  }

  return (
    <Animated.View style={styles.container}>
      <View>
        <Text>{props.animatedState}</Text>
      </View>

      <View style={styles.ballContainer}>
        <TheBall 
          width={props.AnimeWidth}
          styleRotate={styleRotate}
          ballStyle={props.AnimeStyle}
          eyeStyle={props.AnimeEyeStyle} />
      </View>
      
      <AnimationBar changeAnimation={changeAnimation}/>
    </Animated.View>
  );
};


const mapStateToProps = state => {
  return {
    health: state.Ball.health,
    animatedState: state.Ball.animatedState,
    AnimeStyle: state.BallAnime.style,
    AnimeEyeStyle: state.BallAnime.eyeStyle,
    defaultBody: state.Ball.body
  }
}

const HomeConnect = connect(mapStateToProps, {changeAnimatedState, ResetAnimation, SadWidthAnimation})(Home);

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
    flex:1,
    justifyContent: 'center'
  }
  
});