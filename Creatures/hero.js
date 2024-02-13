class Hero extends Creature {
  mana;
  maxMana;
  specialCost;
  special;
  xp = 0;
  weapon;
  
  constructor(
    name,
    maxHealth, 
    minDmg, 
    maxDmg, 
    basic,
    maxMana,
    special, 
    specialCost,
    minSpDmg,
    maxSpDmg,
    hPotions,
    mPotions,
  ) 
     {
    super(name, maxHealth, minDmg, maxDmg);
    this.basic = basic;
    this.mana = maxMana;
    this.maxMana = maxMana;
    this.special = special;
    this.specialCost = specialCost;
    this.minSpDmg = minSpDmg;
    this.maxSpDmg = maxSpDmg;
    this.hPotions = hPotions;
    this.mPotions = mPotions;
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
