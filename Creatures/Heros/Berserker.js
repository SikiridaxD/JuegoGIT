class Berserker extends Hero {
  id = 8;
  profession = "Berserker";
  maxHealth = 65;
  health = this.maxHealth;
  defense = 1;
  mDefense = 0;
  armor= ["Clothes"];
  maxMana = 10;
  mana = this.maxMana;
  hPotions = 2;
  mPotions = 0;
  bombs = 0;
  basic = "Dual axes";
  minDmg = 2;
  maxDmg = 12;
  special = "Rage Smash";
  specialCost = 8;
  minSpDmg = 8;
  maxSpDmg = 40;


};

let berserker = new Berserker();

