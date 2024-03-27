export default class Character {
    name : string;
    attack : number; 
    defense : number;
    speed : number; 
    maxHp : number;
    currentHp : number;
    team:string;

    constructor(name : string, team:string, attack : number, defense : number,speed : number, maxHp : number){
        this.name = name
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.maxHp = maxHp;
        this.currentHp = maxHp;
        this.team=team;
    }

    damage(enemy:Character) {
        if(this.currentHp > 0) {
            enemy.currentHp-=(this.attack - this.defense)
        } else {
            console.log("On n'attaque pas un mort !")
        }
    }

    heal(percent : number) {
        if(this.currentHp <= 0){
            console.log("On ne soigne pas un mort !")
        } else {
            if(this.currentHp > this.currentHp + this.maxHp*(percent/100)) {
                this.currentHp = this.maxHp
            } else {
                this.currentHp += this.maxHp*(percent/100)
            }
        }
    }

    resurection(percent : number) {
        if(this.currentHp <= 0) {
            this.currentHp += this.maxHp*(percent/100)
        } else {
            console.log("On ne ressucite pas un un personnage déjà vivant !")
        }
    }

    playTurn(player:Character[],monster:Character[]){
    }
}
