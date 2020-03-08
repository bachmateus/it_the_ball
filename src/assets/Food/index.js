import Milk from './Milk';
import Meat from './Meat';

const Food = [
  Milk,
  Meat
];

export default Food;

/**
 * Function created to get the feelings value that will increase or decrease to the actual value
 * @param {String} feedType 
 * @param {Number} age 
 * @returns {Object}
 */
export const getValueToChange = ( feedType, age ) => {
  switch (feedType){
    case 'milk': return Milk.feed[age];
    case 'meat': return Meat.feed[age];
    
    default: [];
  }
}