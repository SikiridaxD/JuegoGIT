let currentMonster; 
//Heros
const heros = [
  archer,
  berserker,
  cleric,
  elf,
  mage,
  paladin,
  rogue,
  warrior
];
//Monstruos
const monsters = [
  {
    id: 0,
    name: "Slime",
    level: 2,
    maxHealth: 15,
    minDmg: 1,
    maxDmg: 4,
  },
  {
    id: 1,
    name: "Red slime",
    level: 2,
    maxHealth: 25,
    minDmg: 1,
    maxDmg: 6,
  },
  {
    id: 2,
    name: "King slime",
    level: 2,
    maxHealth: 50,
    minDmg: 1,
    maxDmg: 10,
  },
  {
    id: 3,
    name: "Fox",
    level: 8,
    maxHealth: 15,
    minDmg: 1,
    maxDmg: 6,
  },
  {
    id: 4,
    name: "Fanged Beast",
    level: 8,
    maxHealth: 40,
    minDmg: 2,
    maxDmg: 12,
  },
  {
    id: 5,
    name: "Alpha",
    level: 8,
    maxHealth: 80,
    minDmg: 3,
    maxDmg: 18,
  },
  {
    id: 6,
    name: "Goblin",
    level: 5,
    maxHealth: 20,
    minDmg: 1,
    maxDmg: 8,
  },
  {
    id: 7,
    name: "Orc",
    level: 5,
    maxHealth: 60,
    minDmg: 2,
    maxDmg: 16,
  },
  {
    id: 8,
    name: "Ogre",
    level: 5,
    maxHealth: 100,
    minDmg: 3,
    maxDmg: 24,
  },
  {
    id: 9,
    name: "dragon",
    level: 20,
    maxHealth: 300,
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
  gofightMonster(currentMonster.id);
}

function gofightMonster(idMonster) {
  let selectedMonster = monsters[idMonster];
  currentMonster = new Monster(
    selectedMonster.name,
    selectedMonster.maxHealth,
    selectedMonster.minDmg,
    selectedMonster.maxDmg,
    selectedMonster.id
  );
  update(locations[7]);
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
  update(locations[8]);
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
  updateLog("You attack it with your " + currentHero.basic + ".");
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
    updateLog(" You perform a " + currentHero.special + " attack.");
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
  if (currentHero.isManaFull()) {
    currentHero.mana += 1;
  }
}

//Funciones de curación
function usePotion() {
  if (currentHero.hPotions == 0) {
    updateLog("You don't have any potions.");
    return;
  }
  currentHero.potions--;
  poti = Math.floor(Math.random() * (14 - 3 + 1)) + 3;
  currentHero.health += poti;
  updateLog("You drink a potion, restore " + poti + " health points");
  updateHeroTexts();
}

