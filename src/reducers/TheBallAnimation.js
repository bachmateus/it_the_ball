import { Animated } from "react-native";

// import { NormalWidthAnimation } from '../stateAnimation/TheBall/Normal';


const initialState = {
  width: new Animated.Value(40),

  style: {
    width: new Animated.Value(50),
    height: new Animated.Value(60),
  },

  eyeStyle: {
    width: new Animated.Value(8),
    height: new Animated.Value(8),
  }
}

const TheBallAnimation = ( state = initialState, action ) => {
  
  switch (action.type) {
    case "ResetAnimation": 
      const newStyle = action.payload;
      console.log(newStyle.width)
      return { 
        ...state,
        style: {
          width: new Animated.Value(newStyle.width),
          height: new Animated.Value(newStyle.height),
        },
        eyeStyle: {
          width: new Animated.Value(newStyle.eye.width),
          height: new Animated.Value(newStyle.eye.height),  
        }
      };

      break;
  
    default:
      break;
  }

  return state;
}

export default TheBallAnimation;