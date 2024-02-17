class Armor extends item{
    defense;
    mDefense;

    constructor(name, cost, defense,mDefense){
        super(name, cost)
        this.defense = defense;
        this.mDefense = mDefense;
    }
}

let ligthArmor   = new Armor("Ligth Armor", 20, 2, 1)
let mediumArmor  = new Armor("Medium Armor", 30, 4, 2)
let heavyArmor   = new Armor("Heavy Armor", 50, 8, 4)
let magicalArmor = new Armor("Magical Armor", 60, 4, 8)