class Archer extends Hero {
  id = 6;
  profession = "Archer";
  maxHealth = 35;
  health = this.maxHealth;
  defense = 1;
  mDefense = 0;
  armor= ["Clothes"];
  maxMana = 40;
  mana = this.maxMana;
  hPotions = 1;
  mPotions = 0;
  bombs = 0;
  basic = "Long bow";
  minDmg = 1;
  maxDmg = 8;
  special = "Multishoot";
  specialCost = 12;
  minSpDmg = 2;
  maxSpDmg = 12;


};

let archer = new Archer();

