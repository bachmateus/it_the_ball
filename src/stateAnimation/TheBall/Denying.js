import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { showConsoleStateAnimation, speedTimeGame } from '../../scripts/config';

export const DenyingWidthAnimation = (style, checkAnimate, rotation) => {
  (showConsoleStateAnimation) && console.log('Animating Denying');
  
  Animated.sequence([
    Animated.parallel([
      Animated.timing(
        style.ball.height,
        {toValue: style.defaultBody.width, duration: (100 * speedTimeGame) }
      ),

      Animated.timing(
        style.ball.width,
        {toValue: style.defaultBody.width, duration: (100 * speedTimeGame) }
      ),

      Animated.timing(
        style.eye.height,
        {toValue: 2, duration: (100 * speedTimeGame) }
        ),
    ]),

    Animated.timing(
      rotation,
      {
        toValue: 1,
        duration: (200 * speedTimeGame),
        easing: Easing.linear,
      }
    ),

    Animated.timing(
      rotation,
      {
        toValue: -1,
        duration: (200 * speedTimeGame),
        easing: Easing.linear,
      }
    ),

    Animated.timing(
      rotation,
      {
        toValue: 1,
        duration: (200 * speedTimeGame),
        easing: Easing.linear,
      }
    ),

    Animated.timing(
      rotation,
      {
        toValue: -1,
        duration: (200 * speedTimeGame),
        easing: Easing.linear,
      }
    ),

    Animated.timing(
      rotation,
      {
        toValue: 0,
        duration: (200 * speedTimeGame),
        easing: Easing.linear,
      }
    ),

    Animated.timing(
      style.eye.height,
      {toValue: style.defaultBody.eye.height, duration: (300 * speedTimeGame) }
    ),
  ]).start(function(){checkAnimate()});
}
