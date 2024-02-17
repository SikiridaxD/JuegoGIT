class Cleric extends Hero {
  id = 7;
  profession = "Cleric";
  maxHealth = 45;
  health = this.maxHealth;
  defense = 1;
  mDefense = 0;
  armor= ["Clothes"];
  maxMana = 45;
  mana = this.maxMana;
  hPotions = 0;
  mPotions = 1;
  bombs = 0;
  basic = "Morningstar";
  minDmg = 1;
  maxDmg = 8;
  special = "Healing Light";
  specialCost = 15;
  minSpDmg = 10;
  maxSpDmg = 30;


};

let cleric = new Cleric();

