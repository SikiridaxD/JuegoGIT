//Clase padre
class item{
  name;
  cost;

  constructor(name, cost){
    this.name = name;
    this.cost = cost;
  }
}

//Vector de items
const items = [
  {
    name: "Potion of Healing",
    cost: 10,
    target: "health",
    value: 10,
  },
  {
    name: "Potion of mana",
    cost: 15,
    target: "mana",
    value: 10,
  },{
    name: "Bombs",
    cost: 25,
    target: "enemy health",
    value: 10,
  },
]

//En construccion :p
class potion extends item{
  target;
  value;

  constructor(name,cost,target,value){
    super(name,cost);
    this.target = target;
    this.value = value;
  }
  recover(obj){
    if (this.target === "health"){
      return obj.healing(this.value);
    }
    return obj.mana += this.value;
  }
}

//Construcción de pociones
const hpPotion = items[0];
const hPotion = new potion(
  hpPotion.name,
  hpPotion.cost,
  hpPotion.target,
  hpPotion.value
)

const mnPotion = items[1];
const mPotion = new potion(
  mnPotion.name,
  mnPotion.cost,
  mnPotion.target,
  mnPotion.value
)


//Otros items
class Weapon {
  name;
  minDmg;
  maxDmg;
  critical;

  constructor(name, minDmg, maxDamage, critical) {
    this.name = name;
    this.minDmg = minDmg;
    this.maxDmg = maxDamage;
    this.critical = critical;
  }
}

