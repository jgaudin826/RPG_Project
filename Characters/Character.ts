export default class Character {
    name : string;
    attack : number; 
    defense : number;
    speed : number; 
    maxHP : number;
    currentHP : number;
    team:string;
    className:string=""

    constructor(name : string, team:string, attack : number, defense : number,speed : number, maxHp : number){
        this.name = name
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.maxHP = maxHp;
        this.currentHP = maxHp;
        this.team=team;
    }

    damage(enemy:Character) {
        if(this.currentHP > 0) {
            enemy.currentHP-=(this.attack - this.defense)
        } else {
            console.log("On n'attaque pas un mort !")
        }
    }

    playTurn(player:Character[],monster:Character[]){
    }

    specialAttack(enemy:Character):object{
        return {bool:false,stealObject:null}
    }
}
