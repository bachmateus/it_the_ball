import { getValueToChange } from "../../assets/Food";

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
    console.log('FeedScript -> Comida ou idade inválida');
    return;
  }

  setNewValues( 
    actualValues.hungry - feelingsValuesChange.hungry, 
    actualValues.health + feelingsValuesChange.health, 
    actualValues.happyness + feelingsValuesChange.happyness
  );

}

export default FeedScript;