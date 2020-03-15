import EatMeat from '../Icons/EatMeat.png';

const Meat = { 
  id: 1, 
  name: 'meat', 
  icon: EatMeat,
  feed: [
    { hungry: 0, health: -5 , happyness: -5 },
    { hungry: 5, health: -2 , happyness: 0 },
    { hungry: 10, health: 0 , happyness: 2 }
  ]
};

export default Meat;