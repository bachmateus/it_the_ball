import MilkForBaby from '../Icons/MilkForBaby.png';

const Milk = { 
  id: 0, 
  name: 'milk', 
  icon: MilkForBaby,
  feed: [
    { hungry: 3, health: 1, happyness: 1 },
    { hungry: 2, health: 1, happyness: 0 },
    { hungry: 0, health: 1, happyness: -2 },
  ]
};

export default Milk;
