class Mage extends Hero {
  id = 2;
  profession = "Mage";
  maxHealth= 30;
  health = this.maxHealth;
  defense = 1;
  mDefense = 0;
  armor;
  maxMana= 50;
  mana = this.maxMana;
  hPotions = 0;
  mPotions = 1;
  bombs = 0;
  basic = "Magic missil";
  minDmg = 1;
  maxDmg = 4;
  special = "Fire Ball";
  specialCost = 12;
  minSpDmg = 8;
  maxSpDmg = 32;


};

let Gandalf = new Mage();

console.log(Gandalf);