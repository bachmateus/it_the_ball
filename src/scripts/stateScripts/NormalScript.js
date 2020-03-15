// Degree the ball's properties
export const NormalScript = (params, animateAction, rotate, animationState) => {
  const { timeCheck, setNewValues, actualValues, styleAnimation } = params;
  const newValues = getValues(actualValues.animatedState, actualValues.age);

  setNewValues( 
    actualValues.hungry + newValues.hungry, 
    actualValues.health - newValues.health, 
    actualValues.happyness - newValues.happyness
  );
  
  if ( animationState == 'transition' )
    animateAction(styleAnimation, () => { params.changeAnimation('normal') }, rotate);
  else 
    animateAction(styleAnimation, () => { params.setTimeCheck(!timeCheck)}, rotate);
}

// Get the values of the quantity of each feelings properties that will be changed based on the ball's age
function getValues (animatedState, age) {
  switch (animatedState) {
    case 'normal':
      const normalNewValues = [
        { hungry: 0.2, health: 0.1, happyness: 0.1 },
        { hungry: 0.2, health: 0.1, happyness: 0.1 },
        { hungry: 0.2, health: 0.1, happyness: 0.1 },
      ];

      return normalNewValues[age];
    
    case 'sad':
      const sadNewValues = [
        { hungry: 0, health: 0.2, happyness: 0.1 },
        { hungry: 0, health: 0.2, happyness: 0.1 },
        { hungry: 0, health: 0.2, happyness: 0.1 },
      ];
      
      return sadNewValues[age];
    
    case 'sleeping':
      const sleepingNewValues = [
        { hungry: 0.2, health: 0, happyness: 0 },
        { hungry: 0.2, health: 0, happyness: 0 },
        { hungry: 0.2, health: 0, happyness: 0 },
      ];
      
      return sleepingNewValues[age];
    
    case 'hungry':
      const hungryNewValues = [
        { hungry: 0.2, health: 0.2, happyness: 0.1 },
        { hungry: 0.2, health: 0.2, happyness: 0.1 },
        { hungry: 0.2, health: 0.2, happyness: 0.1 },
      ];
      
      return hungryNewValues[age];
    
    case 'sick':
      const sickNewValues = [
        { hungry: 0, health: 0.2, happyness: 0.4 },
        { hungry: 0, health: 0.2, happyness: 0.4 },
        { hungry: 0, health: 0.2, happyness: 0.4 },
      ];
      
      return sickNewValues[age];

    case 'dead':
      const deadNewValues = [
        { hungry: 0, health: 0, happyness: 0 },
        { hungry: 0, health: 0, happyness: 0 },
        { hungry: 0, health: 0, happyness: 0 },
      ];
      
      return deadNewValues[age];
    
    default: return { hungry: 0, health: 0, happyness: 0 };
  }
}


