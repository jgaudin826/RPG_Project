export default class Character {
    name : string;
    attack : number; 
    defense : number;
    speed : number; 
    maxHP : number;
    currentHP : number;
    className : string;

    constructor(name : string, attack : number, defense : number,speed : number, maxHP : number, currentHP : number, className : string){
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.maxHP = maxHP;
        this.currentHP = currentHP;
        this.className = className;
    }

    damage() {
        if(this.currentHP > 0) {
            this.attack - this.defense
        } else {
            console.log("On n'attaque pas un mort !")
        }
    }
}
