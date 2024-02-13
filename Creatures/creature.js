class Creature {
  name;
  health;
  maxhealth;
  level = 1;
  minDmg;
  maxDmg;

  constructor(name, maxHealth, minDmg, maxDmg) {
    this.name = name;
    this.maxhealth = maxHealth;
    this.health = maxHealth;
    this.minDmg = minDmg;
    this.maxDmg = maxDmg;
  }
  
  healthDamage(healthValue) {
    if (this.health + healthValue > this.maxhealth) {
      this.health = this.maxhealth;
    } else {
      this.health += healthValue;
    }
  }

  // El mostruo recibe daño
  getDamage(dmg) {
    this.health -= dmg;
  }

  isDead() {
    return this.health <= 0;
  }

  // Obtenemos un valor de daño entre los rangos min-max
  getAttackValue() {
    return Math.floor(Math.random() * (this.maxD - this.minD + 1)) + this.minD;
  }
}
