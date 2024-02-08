//Heros
const heros = [
  {
    id: 1,
    name: "Warrior",
    healthMax: 50,
    health: 50,
    mana: 20,
    maxMana: 20,
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
  goFight();
}

// Revisar relevancia
function fightAgain() {
  goFight();
}

function goFight() {
  update(locations[4]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
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
  if (currentHero.health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 3) {
      winGame();
    } else {
      defeatMonster();
    }
  }
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  currentHero.xp += monsters[fighting].level;
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
  multiText("The " + monsters[fighting].name + " attacks.");
  let monsterDamage = getMonsterAttackValue();
  currentHero.health -= monsterDamage;
  multiText("You suffer " + monsterDamage + " points of damage");
}

function getMonsterAttackValue() {
  let minDamage = monsters[fighting].minD;
  let maxDamage = monsters[fighting].maxD;
  return Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
}

//Funciones de ataque jugador
function normalAttack() {
  let damage = 0;
  multiText("You attack it with your " + weapons[currentWeapon].name + ".");
  if (isMonsterHit()) {
    damage = weaponDamage();
    multiText("You do " + damage + " damage.");
    if (isCrit()) {
      damage += weaponDamage();
      multiText("You get a critical. You do " + damage + " of damage.");
    }
    monsterHealth -= damage;
  } else {
    multiText("You miss.");
  }
  monsterHealthText.innerText = monsterHealth;
}

function specialAttack() {
  if (currentHero.mana > currentHero.specialCost) {
    multiText(" You perform a "+ currentHero.special +" attack.");
    currentHero.mana -=  currentHero.specialCost;
    if (isMonsterHit()) {
      damage = weaponDamage() + specialAttackDamage();
      multiText("You do " + damage + " damage.");
      if (isCrit()) {
        damage += weaponDamage() + specialAttackDamage();
        multiText("You get a critical. You do " + damage + " of damage.");
      }
      monsterHealth -= damage;
    } else {
      multiText("You miss.");
    }
  } else {
    multiText(" You don't have enough mana");
  }
  monsterHealthText.innerText = monsterHealth;
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

//Funciones de daño
function weaponDamage() {
  minDamage = weapons[currentWeapon].minD;
  maxDamage = weapons[currentWeapon].maxD;
  return Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
}

function isCrit() {
  return Math.random() < 0.5;
}

function specialAttackDamage() {
  return Math.floor(Math.random() * (24 - 4 + 1)) + 4;
}
