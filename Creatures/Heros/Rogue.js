class Rogue extends Hero {
  id = 4;
  profession = "Rogue";
  maxHealth = 35;
  health = this.maxHealth;
  defense = 1;
  mDefense = 0;
  armor;
  maxMana = 25;
  mana = this.maxMana;
  hPotions = 1;
  mPotions = 0;
  bombs = 0;
  basic = "Dagger";
  minDmg = 1;
  maxDmg = 4;
  special = "Shadow strike";
  specialCost = 10;
  minSpDmg = 5;
  maxSpDmg = 20;


};

let LaSombra = new Rogue();

