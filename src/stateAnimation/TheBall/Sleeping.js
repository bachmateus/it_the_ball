import { Animated } from 'react-native';
import { showConsoleStateAnimation, speedTimeGame } from '../../scripts/config';

export const SleepingWidthAnimation = (style, checkAnimate) => {
  (showConsoleStateAnimation) && console.log('Animating Sleeping')

  Animated.sequence([

    Animated.parallel([
      Animated.timing(
        style.eye.height,
        {toValue: 1, duration: (1200 * speedTimeGame) }
      ), // Fechar olho
  
      Animated.timing(
        style.ball.width,
        {toValue: style.defaultBody.width , duration: (1200 * speedTimeGame) }
      ), 
      
      Animated.timing(
        style.ball.height,
        {toValue: style.defaultBody.height - 10, duration: (1200 * speedTimeGame) }
      ),
    ]),

    Animated.timing(
      style.ball.height,
      {toValue: style.defaultBody.height - 20, duration: (2000 * speedTimeGame) }
    ),

  ]).start(
    function(){checkAnimate()}
  );
}
