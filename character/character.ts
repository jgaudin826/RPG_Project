export default class Character {
    name : string;
    attack : number; 
    defense : number;
    speed : number; 
    maxHP : number;
    currentHP : number;
    className : string;

    constructor(name : string, attack : number, defense : number,speed : number, maxHP : number, currentHP : number, className : string){
        this.name = name
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

    heal(percent : number) {
        if(this.currentHP <= 0){
            console.log("On ne soigne pas un mort !")
        } else {
            if(this.currentHP > this.currentHP + this.maxHP*(percent/100)) {
                this.currentHP = this.maxHP
            } else {
                this.currentHP += this.maxHP*(percent/100)
            }
        }
    }

    resurection(percent : number) {
        if(this.currentHP <= 0) {
            this.currentHP += this.maxHP*(percent/100)
        } else {
            console.log("On ne ressucite pas un un personnage déjà vivant !")
        }
    }
}
