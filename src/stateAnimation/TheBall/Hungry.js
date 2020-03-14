import { Animated } from 'react-native';
import { showConsoleStateAnimation } from '../config';

export const HungryWidthAnimation = (style, checkAnimate) => {
  (showConsoleStateAnimation) && console.log('Animating Hungry')

  const ballWidth = style.defaultBody.width;
  const ballMinWidth = style.defaultBody.width - 20;

  const ballHeight = style.defaultBody.height - 10;
  const ballMinHeight = style.defaultBody.height - 20;

  const eyeHeight = style.defaultBody.eye.height;

  Animated.sequence([
    Animated.parallel([
      Animated.timing(
        style.ball.width,
        {toValue: ballWidth, duration: 400 }
      ),

      Animated.timing(
        style.ball.height,
        {toValue: ballMinHeight, duration: 400 }
      ),

      Animated.timing(
        style.eye.height,
        {toValue: 2, duration: 400 }
      ),
    ]), 

    Animated.parallel([
      Animated.timing(
        style.ball.width,
        {toValue: ballMinWidth, duration: 100 }
      ),

      Animated.timing(
        style.ball.height,
        {toValue: ballHeight, duration: 100 }
      ),
    ]),

    Animated.parallel([
      Animated.timing(
        style.ball.width,
        {toValue: ballWidth, duration: 400 }
      ),

      Animated.timing(
        style.ball.height,
        {toValue: ballMinHeight, duration: 400 }
      ),
    ]), 

    Animated.parallel([
      Animated.timing(
        style.ball.width,
        {toValue: ballMinWidth, duration: 100 }
      ),

      Animated.timing(
        style.ball.height,
        {toValue: ballHeight, duration: 100 }
      ),

      Animated.timing(
        style.eye.height,
        {toValue: eyeHeight, duration: 400 }
      ),
    ]),

    ]).start(
      function(){checkAnimate()}
    );
}
