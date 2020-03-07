
const initialState = {
  age: 0,
  hungry: 1,
  health: 5,
  happyness: 7,

  // hungry: 10,
  // health: 1,
  // happyness: 1,

  body: {
    width: 60,
    height: 60,
    
    eye: {
      width: 8,
      height: 8,
    }    
  },

  animatedState: 'normal'
}

const TheBallReducer = ( state = initialState, action) => {

  switch (action.type) {
    case "changeAnimatedState":
      const newState = action.payload.animatedState;
      if ( state.animatedState == newState )
        return state;
      else 
        return { ...state, animatedState: newState }
    
    case "changeAge" :
      return { ...state, age: action.payload.age}
    
    case "changeHungry" :
      return { ...state, hungry: action.payload.hungry}
    
    case "changeHealth" :
      return { ...state, health: action.payload.health}
    
    case "changeHappyness" :
      return { ...state, happyness: action.payload.happyness}
    
    case "changeValues":
      return { ...state, hungry: action.payload.hungry, health: action.payload.health, happyness: action.payload.happyness }

    case "growBall":
      return {
        ...state,
        body: {
          width: state.body.width * 2,
          height: state.body.height * 2,
          
          eye: {
            width: 8,
            height: 8,
          }    
        },
      }
    
    default:
      return state;
  }
}

export default TheBallReducer;