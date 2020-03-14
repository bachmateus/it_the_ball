export const changeAnimatedState = (newAnimatedState) => {
  return (dispatch) => {
    dispatch({
      type: "changeAnimatedState",
      payload: {
        animatedState: newAnimatedState
      }
    });
  }
}

export const ResetAnimation = (initialStyle) => {
  return (dispatch) => {
    dispatch({
      type: "ResetAnimation",
      payload:initialStyle
    });
  }
}

export const stopWidth = () => {
  return (dispatch) => {
    dispatch({
      type: "stopWidth"
    });
  }
}

export const growBall = () => {
  return (dispatch) => {
    dispatch({
      type: 'growBall'
    });
  }
}

export const changeAge = (Age) => {
  return ( dispatch ) => {
    dispatch({
      type: 'changeAge',
      payload: {
        age: Age
      }
    });
  }
}

export const changeHungry = (Hungry) => {
  return ( dispatch ) => {
    dispatch({
      type: 'changeHungry',
      payload: {
        hungry: Hungry
      }
    });
  }
}

export const changeHealth = (Health) => {
  return ( dispatch ) => {
    dispatch({
      type: 'changeHealth',
      payload: {
        health: Health
      }
    });
  }
}

export const changeHappyness = (Happyness) => {
  return ( dispatch ) => {
    dispatch({
      type: 'changeHappyness',
      payload: {
        happyness: Happyness
      }
    });
  }
}

export const changeValues = (hungry, health, happyness) => {

  const newhungry = ( hungry > 10 ) ? 10 : 
    ( hungry < 0 ) ? 0 : hungry; 

  const newhealth = ( health > 10 ) ? 10 : 
    ( health < 0 ) ? 0 : health; 
  
  const newhappyness = ( happyness > 10 ) ? 10 : 
    ( happyness < 0 ) ? 0 : happyness;
  
  return ( dispatch ) => {
    dispatch({
      type: 'changeValues',
      payload: { hungry: newhungry, health: newhealth, happyness: newhappyness }
    });
  }
}