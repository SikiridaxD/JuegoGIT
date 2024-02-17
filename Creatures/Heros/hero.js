class Hero extends Creature {
  mana;
  maxMana;
  specialCost;
  special;
  xp = 0;
  defense;
  mDefense;
  
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

  manaRestore(restoreValue) {
    if (this.mana + restoreValue > this.maxMana) {
      this.mana = this.maxMana;
    } else {
      this.mana += restoreValue;
    }
  }

  rest(){
    this.health += Math.floor(Math.random()*(24 - 4 + 1) + 4);
    this.mana += Math.floor(Math.random()*(12 - 2 + 1) + 2);
  }

  enoughToSpecial(){
    return this.mana >= this.specialCost;
  }

  isManaFull() {
    return this.mana < this.maxMana;
  }
  
  isHealthFull() {
    return this.health < this.maxHealth;
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

  equipArmor(obj){
    this.armor = obj.name;
    this.defense = obj.defense;
    this.mDefense = obj.mDefense;
  }
}
