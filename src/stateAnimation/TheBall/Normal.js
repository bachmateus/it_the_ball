import { Animated } from 'react-native';
import { showConsoleStateAnimation } from '../config';

export const NormalWidthAnimation = (style, checkAnimate) => {
  (showConsoleStateAnimation) && console.log('Animating Normal')
  
  const initial = Animated.timing(
    style.ball.width,
    {toValue: style.defaultBody.width , duration: 800 }
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
      {toValue: style.defaultBody.eye.height, duration: 200 }
    ),

    final, initial, final
  ]).start(
    function(){checkAnimate()}
  );
}
