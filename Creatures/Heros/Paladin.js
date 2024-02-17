class Paladin extends Hero {
  id = 5;
  profession = "Paladin";
  maxHealth = 60;
  health = this.maxHealth;
  defense = 1;
  mDefense = 0;
  armor;
  maxMana = 25;
  mana = this.maxMana;
  hPotions = 1;
  mPotions = 0;
  bombs = 0;
  basic = "War axe";
  minDmg = 1;
  maxDmg = 8;
  special = "Divine shield";
  specialCost = 15;
  minSpDmg = 3;
  maxSpDmg = 18;

};

let Palaca = new Paladin();