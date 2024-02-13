let currentMonster;

//Heros
const heros = [
/* {
    id: 0,
    name: "[Available]",
    maxHeatlh: 0,
    maxMana: 0,
    hPotions: 0,
    mPotions: 0,
    basic: "-",
    minDmg: 0,
    maxDmg: 0,
    special: "-",
    specialCost: 0,
    minSpDmg: 0,
    maxSpDmg: 0,
  },*/ 
  {
    id: 1,
    name: "Warrior",
    maxHeatlh: 50,
    maxMana: 20,
    hPotions: 1,
    mPotions: 0,
    basic: "Shortsword",
    minDmg: 1,
    maxDmg: 6,
    special: "Powerful Blow",
    specialCost: 8,
    minSpDmg: 4,
    maxSpDmg: 24,
  },
  {
    id: 2,
    name: "Mage",
    maxHeatlh: 30,
    maxMana: 50,
    hPotions: 1,
    mPotions: 0,
    basic: "Magic missil",
    minDmg: 1,
    maxDmg: 4,
    special: "Fire Ball",
    specialCost: 12,
    minSpDmg: 8,
    maxSpDmg: 32,
  },
  {
    id: 3,
    name: "Elf",
    maxHeatlh: 40,
    maxMana: 30,
    hPotions: 1,
    mPotions: 0,
    basic: "Short bow",
    minDmg: 1,
    maxDmg: 6,
    special: "Piercing Shot",
    specialCost: 10,
    minSpDmg: 3,
    maxSpDmg: 18,
  },
  {
    id: 4,
    name: "Rogue",
    maxHeatlh: 35,
    maxMana: 25,
    hPotions: 1,
    mPotions: 0,
    basic: "Dagger",
    minDmg: 1,
    maxDmg: 4,
    special: "Shadow Strike",
    specialCost: 10,
    minSpDmg: 5,
    maxSpDmg: 20,
  },
  {
    id: 5,
    name: "Paladin",
    maxHeatlh: 60,
    maxMana: 25,
    hPotions: 1,
    mPotions: 0,
    basic: "War axe",
    minDmg: 1,
    maxDmg: 8,
    special: "Divine Shield",
    specialCost: 15,
    minSpDmg: 3,
    maxSpDmg: 18,
  },
  {
    id: 6,
    name: "Archer",
    maxHeatlh: 35,
    maxMana: 40,
    hPotions: 1,
    mPotions: 0,
    basic: "Long Bow",
    minDmg: 1,
    maxDmg: 8,
    special: "Multishot",
    specialCost: 12,
    minSpDmg: 2,
    maxSpDmg: 12,
  },
  {
    id: 7,
    name: "Cleric",
    maxHeatlh: 45,
    maxMana: 45,
    hPotions: 1,
    mPotions: 0,
    basic: "Morningstar",
    minDmg: 1,
    maxDmg: 8,
    special: "Healing Light",
    specialCost: 15,
    minSpDmg: 10,
    maxSpDmg: 30,
  },
  {
    id: 8,
    name: "Berserker",
    maxHeatlh: 65,
    maxMana: 10,
    hPotions: 1,
    mPotions: 0,
    basic: "Dual axes",
    minDmg: 2,
    maxDmg: 12,
    special: "Rage Smash",
    specialCost: 20,
    minSpDmg: 8,
    maxSpDmg: 40,
  },
];
//Monstruos
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
    minDmg: 1,
    maxDmg: 6,
  },
  {
    name: "Orc",
    level: 5,
    health: 30,
    minDmg: 3,
    maxDmg: 18,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
    minDmg: 3,
    maxDmg: 18,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
    minDmg: 5,
    maxDmg: 30,
  },
];

function fightMonster(idMonster) {
  fighting = idMonster;
  gofightMonster();
}

// Revisar relevancia
function fightAgain() {
  gofightMonster();
}

function gofightMonster(idMonster) {
  let selectedMonster = monsters[idMonster];
  currentMonster = new Monster(
    selectedMonster.name,
    selectedMonster.health,
    selectedMonster.minD,
    selectedMonster.maxD
  );
  update(locations[4]);
  monsterStats.style.display = "block";
  monsterName.innerText = currentMonster.name;
  monsterHealthText.innerText = currentMonster.health;
}

let attackType = "attack" | "special";

//Esta función representa el combate
function combat(attackType) {
  monsterAttacks();
  if (attackType == "attack") {
    normalAttack();
  }
  if (attackType == "special") {
    specialAttack();
  }
  increaseMana();
  updateHeroTexts();
  updateLog();
  checkWeapon();
  verifyBattle();
  scrollA();
}

function verifyBattle() {
  if (currentHero.isDead()) {
    lose();
  } else if (currentMonster.isDead()) {
    if (fighting === 3) {
      winGame();
    } else {
      defeatMonster();
    }
  }
}

function defeatMonster() {
  this.console.log(currentMonster);
  gold += Math.floor(currentMonster.level * 6.7);
  currentHero.xp += currentMonster.level;
  update(locations[5]);
}

function checkWeapon() {
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    updateLog(" Your " + inventory.pop() + " breaks.");
    currentWeapon--;
  }
}

//Monstruo atacando
function monsterAttacks() {
  updateLog("The " + currentMonster.name + " attacks.");
  let monsterDamage = currentMonster.getAttackValue();
  currentHero.getDamage(monsterDamage);
  updateLog("You suffer " + monsterDamage + " points of damage");
}

//Funciones de ataque jugador
function normalAttack() {
  let damage = 0;
  updateLog("You attack it with your " + currentHero.weapon.name + ".");
  if (isMonsterHit()) {
    damage = currentHero.getAttackValue();
    updateLog("You do " + damage + " damage.");
    if (currentHero.isCrit()) {
      damage += currentHero.getAttackValue();
      updateLog("You get a critical. You do " + damage + " of damage.");
    }
    currentMonster.getDamage(damage);
  } else {
    updateLog("You miss.");
  }
  monsterHealthText.innerText = currentMonster.health;
}

function specialAttack() {
  if (currentHero.enoughToSpecial()) {
    updateLog(" You perform a " + currentHero.specialName + " attack.");
    currentHero.useSpecialAttack();
    if (isMonsterHit()) {
      damage = currentHero.getAttackValue() + currentHero.getSpecialDamage();
      updateLog("You do " + damage + " damage.");
      if (currentHero.isCrit()) {
        damage += currentHero.getAttackValue() + currentHero.getSpecialDamage();
        updateLog("You get a critical. You do " + damage + " of damage.");
      }
      currentMonster.getDamage(damage);
    } else {
      updateLog("You miss.");
    }
  } else {
    updateLog(" You don't have enough mana");
  }
  monsterHealthText.innerText = currentMonster.health;
}

function isMonsterHit() {
  return Math.random() > 0.2 || currentHero.health < 20;
}

//Incrementamos el maná
function increaseMana() {
  if (isManaFull()) {
    currentHero.mana += 1;
  }
}

//Funciones de curación
function usePotion() {
  if (currentHero.potions == 0) {
    updateLog("You don't have any potions.");
    return;
  }
  currentHero.potions--;
  poti = Math.floor(Math.random() * (14 - 3 + 1)) + 3;
  currentHero.health += poti;
  updateLog("You drink a potion, restore " + poti + " health points");
  updateHeroTexts();
}
