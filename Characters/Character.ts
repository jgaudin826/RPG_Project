/**
 * 
 */
export default class Character {
    public attack : number; 
    public defense : number;
    public speed : number; 
    public maxHp : number;
    public currentHp : number;
    public className:string=""

    public constructor(attack : number, defense : number,speed : number, maxHp : number){
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.maxHp = maxHp;
        this.currentHp = maxHp;
    }

    protected damage(enemy:Character) {
        if(this.currentHp > 0) {
            if (this.attack > enemy.defense){
                enemy.currentHp-=(this.attack - enemy.defense)
            } else {
                enemy.currentHp-=2
            }
        } else {
            console.log("On n'attaque pas un mort !")
        }
    }

    public playTurn(player:Character[],monster:Character[]){
    }

    public specialAttack(enemy:Character):object{
        return {bool:false,stealObject:null}
    }
}
