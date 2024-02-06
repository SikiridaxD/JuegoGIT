let xp = 0;
let health = 100;
let gold = 5000;
let mana=20;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

//Buttons
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
//Balance
const goldText = document.querySelector("#goldText");
const potionText = document.querySelector("#potionText");
//Hero
const classText = document.querySelector("#classText");
const xpText = document.querySelector("#xpText");
//Stats
const healthText = document.querySelector("#healthText");
const manaText=document.querySelector("#manaText");
//Monsters
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
//Text
const text = document.querySelector("#text");

const weapons = [
  { name: 'stick',
    minD: 1,
    maxD: 4
  },
  { name: 'dagger', 
    minD: 1,
    maxD: 6
  },
  { name: 'claw hammer',
    minD: 1,
    maxD: 8
  },
  { name: 'sword',
    minD: 1, 
    maxD: 10
  }
];

/**
 * {
 * id: 1,2,3
 * Nombre: "",
 * health: 50, 30, 40
 * healthActual:
 * pociones: 1 , esta restaura 2d6+2
 * mana : 20, 50, 30
 * specialCost: 8 ,12,10,
 * specialDamage : 4d6 , 8d4 ,3d6 
 * special: 'Golpe poderoso', "Bola de fuego", "Flecha perforante"
 * }
 * 
 * 1) Contratar Guerrero
 * 2) Contratar Mago
 * 3) Contratar Elfo
 * 4) Ir al poblado
 * 
 */



const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to tavern", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goTavern, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\".\n"
  },
  {
    name: "tavern",
    "button text": ["Hire warrior", "Hire mage", "Hire elf", "Go to town square"],
    "button functions": [hireWarrior, hireMage, hireElf, goTown],
    text: "You are in the town square. You see a sign that says \"Store\".\n"
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Buy potion (10 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, buyPotion, goTown],
    text: "You enter the store.\n"
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight orc", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightOrc, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.\n"
  },
  {
    name: "fight",
    "button text": ["Attack", "Special", "dummy," "Run"],
    "button functions": [attack, special, dummyFun, goTown],
    text: "You are fighting a monster.\n"
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.\n'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, ,restart, restart],
    text: "You die. ☠️\n"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉\n" 
  },
];

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

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText += location.text +"\n";
  scrollA();
}

function buyHealth() {
  if (gold >= 10 && isManaFull()) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText += "Recovered health and mana\n";
    if(mana=19){
      mana += 1;
      manaText.innerText=mana;
    } else {
      mana += 2;
      manaText.innerText = mana;
    }
  } else if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText += "Recovered health\n";
  } else {
    text.innerText += "You do not have enough gold to buy health.\n";
  }
  scrollA();
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText += "You now have a " + newWeapon + ".\n";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory + "\n";
    } else {
      text.innerText += "You do not have enough gold to buy a weapon.\n";
    }
  } else {
    text.innerText += "You already have the most powerful weapon!\n";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
  scrollA();
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText += "You sold a " + currentWeapon + ".\n";
    text.innerText += " In your inventory you have: " + inventory + "\n";
  } else {
    text.innerText += "Don't sell your only weapon!\n";
  }
  scrollA();
}


function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function scrollA() {
  text.scrollTop = text.scrollHeight;
}


//Devuleve true si falta mana
function isManaFull(){
  return mana < 20 ;
}