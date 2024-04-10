/**
 * a
 */
export default abstract class Character {
    public attack : number; 
    public defense : number;
    public speed : number; 
    public maxHp : number;
    public currentHp : number;
    public className:string=""
    public speedPosition:number=0;

    public constructor(attack : number, defense : number,speed : number, maxHp : number){
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.maxHp = maxHp;
        this.currentHp = maxHp;
    }

    protected damage(enemy:Character,multiplicate:number=1) {
        enemy.healthLosed(this.attack,multiplicate)
    }

    public healthLosed(receveDamage:number,multiplicate:number){
        if (this.attack > this.defense+2){
            this.currentHp= Math.max(this.currentHp-(Math.round((receveDamage - this.defense)*multiplicate)),0)
        } else {
            this.currentHp= Math.max(this.currentHp-2,0)
        }
    }

    public abstract playTurn(player:Character[],monster:Character[])

    public abstract specialAttack(enemy:Character):object

    public heal(percent : number,typeHeal:string="heal") {
        if(typeHeal==="heal"){
            console.log("You can't heal a dead character !")
        } else {
            if(this.currentHp > this.currentHp + this.maxHp*(percent/100)) {
                this.currentHp = this.maxHp
            } else {
                this.currentHp += this.maxHp*(percent/100)
            }
        }
    }
    public resurrect(percent : number) {
        if(this.currentHp <= 0) {
            this.heal(percent,"resurrect")
        } else {
            console.log("You can't resurrect a character who's already alive !")
        }
    }
}
