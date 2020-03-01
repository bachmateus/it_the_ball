
const initialState = {
  age: 0,
  hungry: 3,
  health: 7,
  happyness: 7,

  body: {
    width: 60,
    height: 60,
    
    eye: {
      width: 8,
      height: 8,
    }    
  },


  animatedState: 'sad'
}

const TheBallReducer = ( state = initialState, action) => {

  switch (action.type) {
    case "changeAnimatedState":
      const newState = action.payload.animatedState;
      if ( state.animatedState == newState )
        return state;
      else 
        return { ...state, animatedState: newState }
      
    
    default:
      return state;
  }
}

export default TheBallReducer;