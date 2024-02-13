class Monster extends Creature{
    exp;
    constructor(name, maxHealth, minDmg, maxDmg, id) {
        super(name, maxHealth, minDmg, maxDmg)
        this.id = id;
      }

}
