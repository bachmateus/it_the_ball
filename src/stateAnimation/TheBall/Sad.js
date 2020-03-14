import { Animated } from 'react-native';
import { showConsoleStateAnimation } from '../config';

export const SadWidthAnimation = (style, checkAnimate) => {
  (showConsoleStateAnimation) && console.log('Animating Sad')
  
  const initial = Animated.timing(
    style.ball.width,
    {toValue: style.defaultBody.width + 20 , duration: 1000 }
  );

  const final = Animated.timing(
    style.ball.width,
    {toValue: style.defaultBody.width - 10, duration: 500 }
  );

  Animated.sequence([
    Animated.timing(
      style.ball.height,
      {toValue: style.defaultBody.width, duration: 100 }
    ),

    Animated.parallel([
      initial,

      Animated.timing(
        style.eye.height,
        {toValue: 2, duration: 400 }
      ),
    ]),

    Animated.timing(
      style.eye.height,
      {toValue: 6, duration: 400 }
    ),

    final, initial, final
  ]).start(
    function(){checkAnimate()}
  );
}
