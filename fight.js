let currentMonster;

//Heros
const heros = [
  {
    id: 1,
    name: "Warrior",
    healthMax: 50,
    health: 50,
    mana: 20,
    maxMana: 20,
    basic: "Shortsword",
    minDmg: 1,
    maxDmg: 6,
    special: "Powerful Blow",
    specialCost: 8,
    minSpecialD: 4,
    maxSpecialD: 24,
  },
  {
    id: 2,
    name: "Mage",
    healthMax: 30,
    health: 30,
    mana: 50,
    maxMana: 50,
    basic: "Magic missil",
    minDmg: 1,
    maxDmg: 4,
    special: "Fire Ball",
    specialCost: 12,
    minSpecialD: 8,
    maxSpecialD: 32,
  },
  {
    id: 3,
    name: "Elf",
    healthMax: 40,
    health: 40,
    mana: 30,
    basic: "Short bow",
    minDmg: 1,
    maxDmg: 6,
    special: "Piercing Shot",
    specialCost: 10,
    minSpecialD: 3,
    maxSpecialD: 18,
  },
  {
    id: 4,
    name: "Rogue",
    healthMax: 35,
    health: 35,
    mana: 25,
    basic: "Dagger",
    minDmg: 1,
    maxDmg: 4,
    special: "Shadow Strike",
    specialCost: 10,
    minSpecialD: 5,
    maxSpecialD: 20,
  },
  {
    id: 5,
    name: "Paladin",
    healthMax: 60,
    health: 60,
    mana: 25,
    basic: "War axe",
    minDmg: 1,
    maxDmg: 8,
    special: "Divine Shield",
    specialCost: 15,
    minSpecialD: 3,
    maxSpecialD: 18,
  },
  {
    id: 6,
    name: "Archer",
    healthMax: 35,
    health: 35,
    mana: 40,
    basic: "Long Bow",
    minDmg: 1,
    maxDmg: 8,
    special: "Multishot",
    specialCost: 12,
    minSpecialD: 2,
    maxSpecialD: 12,
  },
  {
    id: 7,
    name: "Cleric",
    healthMax: 45,
    health: 45,
    mana: 45,
    basic: "Morningstar",
    minDmg: 1,
    maxDmg: 8,
    special: "Healing Light",
    specialCost: 15,
    minSpecialD: 10,
    maxSpecialD: 30,
  },
  {
    id: 8,
    name: "Berserker",
    healthMax: 65,
    health: 65,
    mana: 10,
    basic: "Dual axes",
    minDmg: 2,
    maxDmg: 12,
    special: "Rage Smash",
    specialCost: 20,
    minSpecialD: 8,
    maxSpecialD: 40,
  },
];
//Monstruos
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
    minD: 1,
    maxD: 6,
  },
  {
    name: "Orc",
    level: 5,
    health: 30,
    minD: 3,
    maxD: 18,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
    minD: 3,
    maxD: 18,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
    minD: 5,
    maxD: 30,
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
    multiText(" Your " + inventory.pop() + " breaks.");
    currentWeapon--;
  }
}

//Monstruo atacando
function monsterAttacks() {
  multiText("The " + currentMonster.name + " attacks.");
  let monsterDamage = currentMonster.getAttackValue();
  currentHero.getDamage(monsterDamage);
  multiText("You suffer " + monsterDamage + " points of damage");
}

//Funciones de ataque jugador
function normalAttack() {
  let damage = 0;
  multiText("You attack it with your " + currentHero.weapon.name + ".");
  if (isMonsterHit()) {
    damage = currentHero.getAttackValue();
    multiText("You do " + damage + " damage.");
    if (currentHero.isCrit()) {
      damage += currentHero.getAttackValue();
      multiText("You get a critical. You do " + damage + " of damage.");
    }
    currentMonster.getDamage(damage);
  } else {
    multiText("You miss.");
  }
  monsterHealthText.innerText = currentMonster.health;
}

function specialAttack() {
  if (currentHero.enoughToSpecial()) {
    multiText(" You perform a " + currentHero.specialName + " attack.");
    currentHero.useSpecialAttack();
    if (isMonsterHit()) {
      damage = currentHero.getAttackValue() + currentHero.getSpecialDamage();
      multiText("You do " + damage + " damage.");
      if (currentHero.isCrit()) {
        damage += currentHero.getAttackValue() + currentHero.getSpecialDamage();
        multiText("You get a critical. You do " + damage + " of damage.");
      }
      currentMonster.getDamage(damage);
    } else {
      multiText("You miss.");
    }
  } else {
    multiText(" You don't have enough mana");
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
    msg = "You don't have any potions.";
    return;
  }
  currentHero.potions--;
  poti = Math.floor(Math.random() * (14 - 3 + 1)) + 3;
  currentHero.health += poti;
  msg = "You drink a potion, restore " + poti + " health points";
  updateLog();
  updateHeroTexts();
}
