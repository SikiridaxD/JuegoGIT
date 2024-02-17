class Elf extends Hero {
  id = 3;
  profession = "Elf";
  maxHealth = 40;
  health = this.maxHealth;
  defense = 1;
  mDefense = 0;
  armor;
  maxMana = 30;
  mana = this.maxMana;
  hPotions = 1;
  mPotions = 0;
  bombs = 0;
  basic = "Short bow";
  minDmg = 1;
  maxDmg = 6;
  special = "Piercing Shot";
  specialCost = 10;
  minSpDmg = 3;
  maxSpDmg = 18;


};

let Ralo = new Elf();