let xp = 0;
let health = 0;
let gold = 5000;
let hPotions = 0;
let mPotions = 0;
let mana = 0;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let currentHero;
let msg = "";
let party = [];

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
  }
  if (hero2.checked) {
    let currentHeroValue = 1;
    currentHero = party[1];
    updateHeroTexts(currentHeroValue);
  }
  if (hero3.checked) {
    let currentHeroValue = 2;
    currentHero = party[2];
    updateHeroTexts(currentHeroValue);
  }
}

//Buttons
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
//Balance
const goldText = document.querySelector("#goldText");
//Hero
const classText = document.querySelector("#classText");
const levelText = document.querySelector("#levelText");
const xpText = document.querySelector("#xpText");
//Stats
const healthText = document.querySelector("#healthText");
const manaText = document.querySelector("#manaText");
const hPotionText = document.querySelector("#hPotionText");
const mPotionText = document.querySelector("#mPotionText");
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

const locations = [
  {
    name: "town square",
    "button text": [
      "Go to store",
      "Go to tavern",
      "Go to cave",
      "Fight dragon",
    ],
    "button functions": [
      goStore,
      goTavern,
      goCave,
      () => {
        fightMonster(3);
      },
    ],
    text: 'You are in the town square. You see a sign that says "Store".\n',
  },
  {
    name: "tavern",
    "button text": [
      "Hire warrior",
      "Hire mage",
      "Hire elf",
      "Go to town square",
    ],
    "button functions": [
      () => {
        hire(0);
      }, 
      () => {
        hire(1);
      }, 
      () => {
        hire(2);
      }, 
      goTown],
    text: "You are in the tavern. You see a some heros.\n",
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Buy potion (10 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, buyPotion, goTown],
    text: "You enter the store.\n",
  },
  {
    name: "cave",
    "button text": [
      "Fight slime",
      "Fight orc",
      "Fight fanged beast",
      "Go to town square",
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
      goTown,
    ],
    text: "You enter the cave. You see some monsters.\n",
  },
  {
    name: "fight",
    "button text": ["Attack", "Special", "Use potion", "Run"],
    "button functions": [
      () => {
        combat("attack");
      },
      () => {
        combat("special");
      },
      usePotion,
      goTown,
    ],
    text: "You are fighting a monster.\n",
  },
  {
    name: "kill monster",
    "button text": [
      "Fight again",
      "Go to cave",
      "Go store",
      "Go to town square",
    ],
    "button functions": [fightAgain, goCave, goStore, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.\n',
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
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉\n",
  },
];

//Hire functions
function hire(idHero){
  if (party.length<3){
    let used =heroo(idHero);
    party.push(used); 
    updateLog(used.name + " hired");
    updatePartyText();
  } else {
    updateLog("Your party is full");
  }
}

function updatePartyText(){
  hero1Text.innerText = party[0].name;
  hero2Text.innerText = party[1].name;
  hero3Text.innerText = party[2].name;
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
    dummy.mPotions
  );
  return constructHero;
}

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

function goCave() {
  update(locations[3]);
  scrollA();
}

function lose() {
  update(locations[6]);
}

function winGame() {
  update(locations[7]);
}

// initialize buttons
button1.onclick = goStore;
button2.onclick = goTavern;
button3.onclick = goCave;
button4.onclick = () => {
  fightMonster(3);
};

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
  updateLog( location.text);
}

//Store functions
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    updateLog("Recovered health.");
  } else {
    updateLog("You do not have enough gold to buy health.");
  }
  updateHeroTexts();
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
  };
  updateHeroTexts();
}

function buyPotion() {
  if (gold >= 10) {
    gold -= 10;
    potions += 1;
   updateLog("You buy a potion.");
  } else {
   updateLog("You do not have enough gold to buy potions.");
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

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  updateHeroTexts();
  goTown();
}

function scrollA() {
  text.scrollTop = text.scrollHeight;
}

//Función de actualizacion de textos del heroe
function updateHeroTexts() {
  goldText.innerText = gold;
  hPotionText.innerText = currentHero.hPotions;
  mPotionText.innerText = currentHero.mPotions;
  healthText.innerText =  currentHero.health;
  manaText.innerText = currentHero.mana;
  xpText.innerText = currentHero.xp;
  levelText.innerText = currentHero.level;
  classText.innerText = currentHero.name;
}

//Función de actualización de registro
function updateLog(msg) {
  text.innerText += msg + "\n";
  text.scrollTop = text.scrollHeight;
}

//Devuleve true si falta mana
function isManaFull() {
  return mana < 20;
}