
function fightSlime() {
    fighting = 0;
    goFight();
  }
  
  function fightBeast() {
    fighting = 1;
    goFight();
  }
  
  function fightDragon() {
    fighting = 2;
    goFight();
  }
  
  function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
    scrollA();
  }
  
  function attack() {
    text.innerText += "The " + monsters[fighting].name + " attacks.\n";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".\n";
    let monsterDamage=getMonsterAttackValue();
    health -= monsterDamage;
    text.innerText += "You suffer " + monsterDamage + " points of damage\n";
    let isHit = isMonsterHit();
    if (isHit && isCrit()) {
      let damage = weaponDamage() + weaponDamage();
      monsterHealth -= damage;
      text.innerText += " You get a critical. You do " + damage + " of damage.\n";    
    } else if (isHit) {
      let damage = weaponDamage();
      monsterHealth -= damage;
      text.innerText += " You do " + damage + " damage.\n"  
    } else {
      text.innerText += " You miss.\n";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (isManaFull()){
      mana += 1;
      manaText.innerText=mana;
    }
  
    if (health <= 0) {
      lose();
    } else if (monsterHealth <= 0) {
      if (fighting === 2) {
        winGame();
      } else {
        defeatMonster();
      }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
      text.innerText += " Your " + inventory.pop() + " breaks.\n";
      currentWeapon--;
    }
    scrollA();
  }
  
  function getMonsterAttackValue() {
    let minDamage = monsters[fighting].minD;
    let maxDamage = monsters[fighting].maxD;
    return Math.floor(Math.random() *(maxDamage - minDamage + 1) ) + minDamage ; 
  }
  
  function isMonsterHit() {
    return Math.random() > .2 || health < 20;
  }
  
  function special() {
    if (mana>0){
      text.innerText += "The " + monsters[fighting].name + " attacks.\n";
      text.innerText += " You perform a special attack.\n";
      mana-=8;
      manaText.innerText=mana;
      let monsterDamage=getMonsterAttackValue();
      health -= monsterDamage;
      text.innerText += "You suffer " + monsterDamage + " points of damage\n";
      let isHit = isMonsterHit();
      if (isHit && isCrit()) {
        let damage = weaponDamage() + weaponDamage() + specialAttackDamage() + specialAttackDamage();
        monsterHealth -= damage;
        text.innerText += " You get a critical. You do " + damage + " of damage.\n"    
      } else if (isHit) {
        let damage = weaponDamage()  + specialAttackDamage();
        monsterHealth -= damage;
        text.innerText += " You do " + damage + " damage.\n"  
      } else {
        text.innerText += " You miss.\n";
      }
      healthText.innerText = health;
      monsterHealthText.innerText = monsterHealth;
      if (health <= 0) {
        lose();
      } else if (monsterHealth <= 0) {
        if (fighting === 2) {
          winGame();
        } else {
          defeatMonster();
        }
      }
      if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.\n";
        currentWeapon--;
      }
    } else {
      text.innerText += " You don't have enough mana\n";
    }
  
    scrollA();
  }
  
  function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
  }


  
function weaponDamage() {
    minDamage = weapons[currentWeapon].minD;
    maxDamage = weapons[currentWeapon].maxD;
    return Math.floor(Math.random() *(maxDamage - minDamage + 1) ) + minDamage ; 
  }
  
  
  function isCrit() {
    return Math.random() < .5 ;
  }
  
  function specialAttackDamage(){
    return  Math.floor(Math.random() *(24 - 4 + 1) ) + 4;
  }