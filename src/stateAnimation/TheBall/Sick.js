import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

export const SickWidthAnimation = (style, rotation, checkAnimate) => {
  console.log('Animating Sick')
  
  
  Animated.sequence([
    Animated.timing(
      rotation,
      {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
      }
    ),
    
    Animated.parallel([
      Animated.timing(
        style.eye.height,
        {toValue: style.defaultBody.eye.height, duration: 400 }
        ),
      Animated.timing(
          style.eye.width,
          {toValue: style.defaultBody.eye.width, duration: 400 }
          ),
    ]),
        
    Animated.parallel([
      Animated.timing(
        style.eye.height,
        {toValue: style.defaultBody.eye.height + 10, duration: 400 }
        ),
      Animated.timing(
          style.eye.width,
          {toValue: style.defaultBody.eye.width + 10, duration: 400 }
          ),
    ]),
  ]).start(
      function(){checkAnimate()}
    );;

}
