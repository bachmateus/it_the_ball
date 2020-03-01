import { Animated } from 'react-native';

export const SleepingWidthAnimation = (style, checkAnimate) => {
  console.log('Animating Sleeping')

  Animated.sequence([

    Animated.parallel([
      Animated.timing(
        style.eye.height,
        {toValue: 1, duration: 1200 }
      ), // Fechar olho
  
      Animated.timing(
        style.ball.width,
        {toValue: style.defaultBody.width , duration: 1200 }
      ), 
      
      Animated.timing(
        style.ball.height,
        {toValue: style.defaultBody.height - 10, duration: 1200 }
      ),
    ]),

    Animated.timing(
      style.ball.height,
      {toValue: style.defaultBody.height - 20, duration: 2000 }
    ),

  ]).start(
    function(){checkAnimate()}
  );
}
