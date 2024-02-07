//Heros
const heros = [
  {
    id: 1,
    name: "Warrior",
    healthMax: 50,
    healthActual: 50,
    mana: 20,
    special: "Powerful Blow",
    specialCost: 8,
    minSpecialD: 4,
    maxSpecialD: 24,
  },
  {
    id: 2,
    name: "Mage",
    healthMax: 30,
    healthActual: 30,
    mana: 50,
    special: "Fire Ball",
    specialCost: 12,
    minSpecialD: 8,
    maxSpecialD: 32,
  },
  {
    id: 3,
    name: "Elf",
    healthMax: 40,
    healthActual: 40,
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
    healthActual: 35,
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
    healthActual: 60,
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
    healthActual: 35,
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
    healthActual: 45,
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
    healthActual: 65,
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

function fightAgain() {
  goFight();
}

function goFight() {
  update(locations[4]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  scrollA();
}

function getMonsterAttackValue() {
  let minDamage = monsters[fighting].minD;
  let maxDamage = monsters[fighting].maxD;
  return Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

let attackType = "attack" | "special";

function combat(attackType) {
  monsterAttacks();
  if (attackType == "attack") {
    normalAttack();
  }
  if (attackType == "special") {
    specialAttack();
  }
  increaseMana();
  checkWeapon();
  verifyBattle();
}

function verifyBattle() {
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 3) {
      winGame();
    } else {
      defeatMonster();
    }
  }
}

function checkWeapon() {
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.\n";
    currentWeapon--;
  }
}

//Monstruo atacando
function monsterAttacks() {  
  text.innerText += "The " + monsters[fighting].name + " attacks.\n";
  let monsterDamage = getMonsterAttackValue();
  health -= monsterDamage;
  text.innerText += "You suffer " + monsterDamage + " points of damage\n";
  healthText.innerText = health;
}

function normalAttack() {
  let damage = 0;
  let msg = "";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".\n";
  if (isMonsterHit()) {
    damage = weaponDamage();
    msg = " You do " + damage + " damage.\n";
    if (isCrit()) {
      damage += weaponDamage();
      msg = " You get a critical. You do " + damage + " of damage.\n";
    }
    monsterHealth -= damage;
    text.innerText += msg;
  } else {
    text.innerText += " You miss.\n";
  }
  monsterHealthText.innerText = monsterHealth;
}

function specialAttack() {
  if (mana > 5) {
    text.innerText += " You perform a 'special' attack.\n";
    mana -= 8;
    if (isMonsterHit()) {
      damage = weaponDamage() + specialAttackDamage();
      msg = " You do " + damage + " damage.\n";
      if (isCrit()) {
        damage += weaponDamage() + specialAttackDamage();
        msg = " You get a critical. You do " + damage + " of damage.\n";
      }
      monsterHealth -= damage;
      text.innerText += msg;
    } else {
      text.innerText += " You miss.\n";
    }
  } else {
    text.innerText += " You don't have enough mana\n";
  }

  monsterHealthText.innerText = monsterHealth;
  manaText.innerText = mana;
}

//Incrementamos el maná
function increaseMana() {
  if (isManaFull()) {
    mana += 1;
    manaText.innerText = mana;
  }
}


function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[5]);
}
//Funciones de curación
function usePotion() {
  if (potions == 0) {
    text.innerText += "You don't have any potions\n";
    return;
  }
  potions--;
  potionText.innerText = potions;
  poti = Math.floor(Math.random() * (14 - 3 + 1)) + 3;
  health += poti;
  healthText.innerText = health;
  text.innerText += "You drink a potion, restore " + poti + " health points\n";
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
