let xp = 0;
let health = 0;
let gold = 5000;
let hPotions = 0;
let mPotions = 0;
let mana = 0;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [0, 0, 0];
let currentHero;
let msg = "";
let party = [];
let quantity = inventory[0];
let it = 0;
let pool = [0, 0, 0];

//Party
const hero1Text = document.querySelector("#hero1Text");
const hero2Text = document.querySelector("#hero2Text");
const hero3Text = document.querySelector("#hero3Text");
const hero1 = document.getElementById("hero1");
const hero2 = document.getElementById("hero2");
const hero3 = document.getElementById("hero3");
hero1.addEventListener("change", partySelection);
hero2.addEventListener("change", partySelection);
hero3.addEventListener("change", partySelection);

function partySelection() {
  if (hero1.checked) {
    let currentHeroValue = 0;
    currentHero = party[0];
    updateHeroTexts(currentHeroValue);
    updateInventory();
  }
  if (hero2.checked) {
    let currentHeroValue = 1;
    currentHero = party[1];
    updateHeroTexts(currentHeroValue);
    updateInventory();
  }
  if (hero3.checked) {
    let currentHeroValue = 2;
    currentHero = party[2];
    updateHeroTexts(currentHeroValue);
    updateInventory();
  }
}
//Inventory
const miSelect = document.getElementById("miSelect");

miSelect.addEventListener("change", function () {
  const valorSeleccionado = miSelect.value;
  if (valorSeleccionado === "hPotions") {
    it = 0;
  }
  if (valorSeleccionado === "mPotions") {
    it = 1;
  }
  if (valorSeleccionado === "bombs") {
    it = 2;
  }
  changeQuantity();
});

//Buttons
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
//Submenu
const submenu = document.getElementById("submenu");
//Balance
const goldText = document.querySelector("#goldText");
//Hero
const classText = document.querySelector("#classText");
const levelText = document.querySelector("#levelText");
const xpText = document.querySelector("#xpText");
//Stats
const healthText = document.querySelector("#healthText");
const manaText = document.querySelector("#manaText");
const quantityText = document.querySelector("#quantityText");
//Monsters
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
//Text
const text = document.querySelector("#text");

const weapons = [
  { name: "stick", minD: 1, maxD: 4 },
  { name: "dagger", minD: 1, maxD: 6 },
  { name: "claw hammer", minD: 1, maxD: 8 },
  { name: "sword", minD: 1, maxD: 10 },
];

/**
 * Locations:
 * 0 = townsquare
 * 1 = tavern
 * 2 = store
 * 3 = explore
 * 4 = plains
 * 5 = forest
 * 6 = cave
 * 7 = figth
 * 8 = kill monster
 * 9 = lose
 * 10 = win
 */
const locations = [
  {
    name: "town square",
    "button text": [
      "Go to store",
      "Go to tavern",
      "Go to explore",
      "Fight dragon",
    ],
    "button functions": [
      goStore,
      goTavern,
      goExplore,
      () => {
        fightMonster(9);
      },
    ],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "tavern",
    "button text": ["Hire", "Rest", "Bet", "Go to town square"],
    "button functions": [submenuDisplay, rest, bet, goTown],
    text: "You are in the tavern. You see a some heros.",
  },
  {
    name: "store",
    "button text": [
      "Buy potion of Healing (10 gold)",
      "Buy potion of Mana (15 gold)",
      "Buy bomb (25 gold)",
      "Go to town square",
    ],
    "button functions": [buyHPotion, buyMPotion, buyBomb, goTown],
    text: "You enter the store.",
  },
  {
    name: "explore",
    "button text": [
      "Go to the plains",
      "Go to the forest",
      "Go to the cave",
      "Go to the town",
    ],
    "button functions": [goPlains, goForest, goCave, goTown],
    text: "You are exploring, where do you want to go?",
  },
  {
    name: "plains",
    "button text": [
      "Fight slime",
      "Fight red slime",
      "Fight King Slime",
      "Go to explore",
    ],
    "button functions": [
      () => {
        gofightMonster(0);
      },
      () => {
        gofightMonster(1);
      },
      () => {
        gofightMonster(2);
      },
      goExplore,
    ],
    text: "You are on the plains. You see some monsters.",
  },
  {
    name: "Forest",
    "button text": [
      "Fight Fox",
      "Fight Fanged beast",
      "Fight Alpha",
      "Go to explore",
    ],
    "button functions": [
      () => {
        gofightMonster(3);
      },
      () => {
        gofightMonster(4);
      },
      () => {
        gofightMonster(5);
      },
      goExplore,
    ],
    text: "You are in the forest. You see some monsters.",
  },
  {
    name: "cave",
    "button text": ["Fight Goblin", "Fight Orc", "Fight Ogre", "Go to Explore"],
    "button functions": [
      () => {
        gofightMonster(6);
      },
      () => {
        gofightMonster(7);
      },
      () => {
        gofightMonster(8);
      },
      goExplore,
    ],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Special", "Use Item", "Run"],
    "button functions": [
      () => {
        combat("attack");
      },
      () => {
        combat("special");
      },
      useItem,
      goTown,
    ],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Fight again",
      "Go to explore",
      "Go store",
      "Go to town square",
    ],
    "button functions": [fightAgain, goExplore, goStore, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, , restart, restart],
    text: "You die. ☠️\n",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goTavern;
button3.onclick = goCave;
button4.onclick = () => {
  fightMonster(9);
};

//Funciones de viaje
function goTown() {
  update(locations[0]);
  scrollA();
}

function goTavern() {
  update(locations[1]);
  scrollA();
}

function goStore() {
  update(locations[2]);
  scrollA();
}

function goExplore() {
  update(locations[3]);
  scrollA();
}

function goPlains() {
  update(locations[4]);
  scrollA();
}

function goForest() {
  update(locations[5]);
  scrollA();
}

function goCave() {
  update(locations[6]);
  scrollA();
}

function lose() {
  update(locations[9]);
}

function winGame() {
  update(locations[10]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  updateHeroTexts();
  goTown();
}

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  updateLog(location.text);
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      let newWeapon = weapons[currentWeapon].name;
      updateLog("You now have a " + newWeapon + ".");
      inventory.push(newWeapon);
      updateLog(" In your inventory you have: " + inventory + ".");
    } else {
      updateLog("You do not have enough gold to buy a weapon.");
    }
  } else {
    updateLog("You already have the most powerful weapon!");
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
  updateHeroTexts();
}

//Reisar utilidad
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText += "You sold a " + currentWeapon + ".\n";
    text.innerText += " In your inventory you have: " + inventory + "\n";
  } else {
    msg = "Don't sell your only weapon!";
  }
  scrollA();
}

function useItem() {
  if (quantity > 0) {
    if (it === 0) {
      currentHero.hPotions -= 1;
      if (currentHero.isHealthFull) {
        currentHero.healing(hPotion.value);
        updateLog("You restore " + hPotion.value + " health points");
      } else {
        updateLog("Health is full");
      }
    }
    if (it === 1) {
      currentHero.mPotions -= 1;
      if (currentHero.isManaFull) {
        currentHero.manaRestore(mPotion.value);
        updateLog("You restore " + mPotion.value + " mana points");
      } else {
        updateLog("Mana is full");
      }
    }
    updateHeroTexts();
    updateInventory();
  } else {
    updateLog("You have no more of this item left");
  }
}

//Funciones de taberna
function bet() {
  if (Math.random < 0.5) {
    gold += 10;
    updateHeroTexts();
    return;
  }
  gold -= 5;
  updateHeroTexts();
}

function rest() {
  currentHero.rest();
}

function heroPool() {
  pool[0] = Math.floor(Math.random() * 8);
  pool[1] = Math.floor(Math.random() * 8);
  pool[2] = Math.floor(Math.random() * 8);
}

//Hire functions
function hire(idHero) {
  if (party.length < 3) {
    let used = heroo(idHero);
    party.push(used);
    updateLog(used.name + " hired");
    updatePartyText();
  } else {
    updateLog("Your party is full");
  }
}

function updatePartyText() {
  if (party[0]) hero1Text.innerText = party[0].name;
  if (party[1]) hero2Text.innerText = party[1].name;
  if (party[2]) hero3Text.innerText = party[2].name;
}

function updateSubmenu() {
  let h1 = heros[pool[0]];
  let h2 = heros[pool[1]];
  let h3 = heros[pool[2]];
  console.log(h1);
  const subbutton1 = document.querySelector("#subbutton1");
  const subbutton2 = document.querySelector("#subbutton2");
  const subbutton3 = document.querySelector("#subbutton3");
  //const subbutton4 = document.querySelector("#subbutton4");
  subbutton1.textContent = h1.name;
  subbutton2.textContent = h2.name;
  subbutton3.textContent = h3.name;
  subbutton1.onclick = () => {
    hire(pool[0]);
  };
  subbutton2.onclick = () => {
    hire(pool[1]);
  };
  subbutton3.onclick = () => {
    hire(pool[2]);
  };
}

function heroo(idHero) {
  let dummy = heros[idHero];
  constructHero = new Hero(
    dummy.name,
    dummy.maxHealth,
    dummy.minDmg,
    dummy.maxDmg,
    dummy.basic,
    dummy.maxMana,
    dummy.special,
    dummy.specialCost,
    dummy.minSpDmg,
    dummy.maxSpDmg,
    dummy.hPotions,
    dummy.mPotions,
    dummy.bombs
  );
  return constructHero;
}

function submenuDisplay() {
  if (submenu.style.display === "none" || submenu.style.display === "") {
    heroPool();
    updateSubmenu();
    submenu.style.display = "block";
    button1.textContent = "Close";
  } else {
    submenu.style.display = "none";
    button1.textContent = "Hire";
  }
}

//Funciones de tienda
function buyHPotion() {
  if (gold >= hPotion.cost) {
    gold -= hPotion.cost;
    currentHero.hPotions += 1;
    updateInventory();
    updateLog(
      "You buy a potion of Healing. Now you have " +
        inventory[0] +
        " potions of healing"
    );
  } else {
    updateLog("You do not have enough gold to buy potions.");
  }
  updateHeroTexts();
}

function buyMPotion() {
  if (gold >= mPotion.cost) {
    gold -= mPotion.cost;
    currentHero.mPotions += 1;
    updateInventory();
    updateLog(
      "You buy a potion of Mana. Now you have " +
        inventory[1] +
        " potions of Mana"
    );
  } else {
    updateLog("You do not have enough gold to buy potions.");
  }
  updateHeroTexts();
}

function buyBomb() {
  if (gold >= hPotion.cost) {
    gold -= hPotion.cost;
    currentHero.hPotions += 1;
    updateLog("You buy a potion of Healing.");
  } else {
    updateLog("You do not have enough gold to buy potions.");
  }
  updateHeroTexts();
  updateInventory();
}

//Funciones de inventario

//Actualizar inventario
function updateInventory() {
  inventory[0] = currentHero.hPotions;
  inventory[1] = currentHero.mPotions;
  inventory[2] = currentHero.bombs;
  changeQuantity();
}

function changeQuantity() {
  quantity = inventory[it];
  quantityText.innerText = quantity;
}

//Función de actualización de registro
function updateLog(msg) {
  text.innerText += msg + "\n";
  text.innerText += "\n";
  text.scrollTop = text.scrollHeight;
}

function scrollA() {
  text.scrollTop = text.scrollHeight;
}

//Función de actualizacion de textos del heroe
function updateHeroTexts() {
  goldText.innerText = gold;
  healthText.innerText = currentHero.health;
  manaText.innerText = currentHero.mana;
  xpText.innerText = currentHero.xp;
  levelText.innerText = currentHero.level;
  classText.innerText = currentHero.name;
  quantityText.innerText = quantity;
}
