import { Animated } from 'react-native';

export const DeadWidthAnimation = (style, checkAnimate) => {
  console.log('Animating Sleeping')

  Animated.sequence([

    Animated.parallel([
      Animated.timing(
        style.eye.height,
        {toValue: 0, duration: 1200 }
      ), // Fechar olho
      
      Animated.timing(
        style.eye.width,
        {toValue: 0, duration: 1200 }
      ), // Fechar olho

      Animated.timing(
        style.ball.width,
        {toValue: style.defaultBody.width , duration: 1200 }
      ), 
      
      Animated.timing(
        style.ball.height,
        {toValue: 2, duration: 1200 }
      ),
    ]),

  ]).start(
    function(){checkAnimate()}
  );
}
