class Creature {
  name;
  health;
  maxHealth;
  level = 1;


  constructor(name, maxHealth, minDmg, maxDmg) {
    this.name = name;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.minDmg = minDmg;
    this.maxDmg = maxDmg;
  }

  healing(healthValue) {
    if (this.health + healthValue > this.maxHealth) {
      this.health = this.maxHealth;
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
    return Math.floor(Math.random()*(this.maxDmg - this.minDmg + 1) + this.minDmg);
  }
}


