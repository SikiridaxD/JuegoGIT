class Hero extends Creature {
  mana;
  maxMana;
  specialCost;
  specialName;
  weapon;
  
  constructor(name, maxHealth, minD, maxD, maxMana, specialCost, specialName) {
    super(name, maxHealth, minD, maxD);
    this.mana = maxMana;
    this.maxMana = maxMana;
    this.specialCost = specialCost;
    this.specialName = specialName;
  }

  enoughToSpecial(){
    return this.mana >= this.specialCost;
  }

  useSpecialAttack(){
    this.mana -= this.specialCost;   
  }

  getSpecialDamage(){
    return Math.floor(Math.random() * (24 - 4 + 1)) + 4;      
  }


  setWeapon(weapon){
    this.weapon = weapon;
  }

  getAttackValue(){
    return Math.floor(Math.random() * (this.weapon.maxDmg - this.weapon.minDmg + 1)) + this.weapon.minDmg ;
  }

  isCrit(){
    return Math.random() < (this.weapon.critical/100);
  }
}
