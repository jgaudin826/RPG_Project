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
        enemy.currentHp=enemy.healthLosed(this.attack)
    }

    public healthLosed(receveDamage:number):number{
        if (this.attack > this.defense+2){
            return Math.max(this.currentHp-(receveDamage - this.defense),0)
        } else {
            return Math.max(this.currentHp-2,0)
        }
    }

    public playTurn(player:Character[],monster:Character[]){
    }

    public specialAttack(enemy:Character):object{
        return {bool:false,stealObject:null}
    }

    private getName():string{
        let name = "";
        const names = ["Cat Edral","Chat Po","Chat Moussa","Chat Teau","Chat Peliet","Chat Odo","Chat Pito","Chat Mourail","Chat Féplèze","Cat Aliseurre","Cat Olic","Chat Cal","Chat Creubleu","Chat Racreauch","Chat Meaux","Chat Rebond","Cat Aracte","Cat Astraufik","Chat Maleau","Cat Treuh","Cat Taugrafi","Cat Pouchinau","Cat Hin","Chat Soeur", "Chat Prystit"];
        const index = Math.floor(Math.random()*names.length);
        name = names[index];
        return name
    }
}
