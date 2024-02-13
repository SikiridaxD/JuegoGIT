class item{
  name;
  cost;

  constructor(name, cost){
    this.name = name;
    this.cost = cost;
  }
}

//En construccion :p
class hPotion extends item{
  
  hRecover(){

  }
}

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

