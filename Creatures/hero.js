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
    bombs
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
    this.bombs = bombs;
  }

  enoughToSpecial(){
    return this.mana >= this.specialCost;
  }

  isManaFull() {
    return this.mana < this.maxMana;
  }

  useSpecialAttack(){
    this.mana -= this.specialCost;   
  }

  getSpecialDamage(){
    return Math.floor(Math.random()*(this.maxSpDmg - this.minSpDmg + 1) + this.minSpDmg);      
  }

  setWeapon(weapon){
    this.weapon = weapon;
  }

  isCrit(){
    return Math.random() < (0.15);
  }
}
