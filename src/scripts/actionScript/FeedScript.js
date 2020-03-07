/**
 * Function created to change the ball's feelings based on the food that you give to it
 * 
 * @param {String} feedType The food that you'll give
 * @param {Object} params Properties of the params
 *  setNewValues -> The function that will change the feelings, 
 *  actualValues -> The actual values of the feelings
 */
export const FeedScript = ( feedType, params ) => {
  const { setNewValues, actualValues } = params;
  let feelingsValuesChange = getValueToChange(feedType, actualValues.age);

  if ( !feelingsValuesChange ) {
    console.log('error -> Comida ou idade inválida');
    return;
  }

  setNewValues( 
    actualValues.hungry - feelingsValuesChange.hungry, 
    actualValues.health + feelingsValuesChange.health, 
    actualValues.happyness + feelingsValuesChange.happyness
  );

}

export default FeedScript;

/**
 * Function created to get the feelings value that will increase or decrease to the actual value
 * @param {String} feedType 
 * @param {Number} age 
 * @returns {Object}
 */
const getValueToChange = ( feedType, age ) => {
  const milkFeed = [
    { hungry: 2, health: 2, happyness: 2 }
  ];
  
  const meatFeed = [
    { hungry: 0, health: -5 , happyness: -5 }
  ];

  switch (feedType){
    case 'milk': return milkFeed[age];
    case 'meat': return meatFeed[age];
    default: [];
  }
}

