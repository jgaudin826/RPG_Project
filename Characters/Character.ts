export default class Character {
    name : string;
    attack : number; 
    defense : number;
    speed : number; 
    maxHp : number;
    currentHp : number;
    team:string;
    className:string=""

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
            if (this.attack <= enemy.defense){
                enemy.currentHp-=(this.attack - enemy.defense)
            } else {
                enemy.currentHp-=2
            }
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
