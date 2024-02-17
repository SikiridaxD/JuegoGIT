class Warrior extends Hero {
  id = 1;
  profession = "Warrior";
  maxHealth = 50;
  health = this.maxHealth;
  defense = 1;
  mDefense = 0;
  armor= ["Clothes"];
  maxMana = 20;
  mana = this.maxMana;
  hPotions = 1;
  mPotions = 0;
  bombs = 0;
  basic = "Shortsword";
  minDmg = 1;
  maxDmg = 6;
  special = "Powerful Blow";
  specialCost = 8;
  minSpDmg = 4;
  maxSpDmg = 24;


};

let warrior = new Warrior();