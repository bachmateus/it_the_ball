// Degree the ball's properties
export const NormalScript = (params, animateAction, rotate) => {
  const { setTimeCheck, timeCheck, setNewValues, actualValues, styleAnimation } = params;
  const newValues = getValues(actualValues.animatedState, actualValues.age);

  setNewValues( 
    actualValues.hungry + newValues.hungry, 
    actualValues.health - newValues.health, 
    actualValues.happyness - newValues.happyness
  );
  
  animateAction(styleAnimation, () => { setTimeCheck(!timeCheck)}, rotate);
}

// Get the values of the quantity of each feelings properties that will be changed based on the ball's age
function getValues (animatedState, age) {
  switch (animatedState) {
    case 'normal':
      const normalNewValues = [
        { hungry: 0.2, health: 0.2, happyness: 0.01 },
      ];

      return normalNewValues[age];
    
    case 'sad':
      const sadNewValues = [
        { hungry: 0.2, health: 0.2, happyness: 0.01 },
      ];
      
      return sadNewValues[age];
    
    case 'sleeping':
      const sleepingNewValues = [
        { hungry: 0.2, health: 0.2, happyness: 0.01 },
      ];
      
      return sleepingNewValues[age];
    
    case 'hungry':
      const hungryNewValues = [
        { hungry: 0.2, health: 0.2, happyness: 0.01 },
      ];
      
      return hungryNewValues[age];
    
    case 'sick':
      const sickNewValues = [
        { hungry: 0.2, health: 0.2, happyness: 0.01 },
      ];
      
      return sickNewValues[age];

    case 'dead':
      const deadNewValues = [
        { hungry: 0, health: 0, happyness: 0 },
      ];
      
      return deadNewValues[age];
  }
}


