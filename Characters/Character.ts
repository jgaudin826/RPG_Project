import { ObjectReturn } from "./objectReturn.ts";
/**
 * The abstract class Character sets the common data for all characters (player and monster).
 */
export default abstract class Character {
    public attack : number; 
    public defense : number;
    public speed : number; 
    public maxHp : number;
    public currentHp : number;
    public className:string=""
    public name : string="Name"
    public speedPosition:number=0;
    public manaMax : number;
    public manaNow : number;
    public divinPowerMax : number;
    public divinPowerNow : number;
    

    /**
     * Creates an instance of Character with the specified attributes.
     * 
     * @param attack The attack value of the character.
     * @param defense The defense value of the character.
     * @param speed The speed value of the character.
     * @param maxHp The maximum HP of the character.
     */
    public constructor(attack : number, defense : number,speed : number, maxHp : number,manaMax : number, divinPowerMax : number){
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.maxHp = maxHp;
        this.currentHp = maxHp;
        this.manaMax= manaMax;
        this.manaNow = manaMax;
        this.divinPowerMax=divinPowerMax;
        this.divinPowerNow=divinPowerMax;
        this.name = this.getName()
        
    }
    
    /**
     * Inflicts damage to an enemy character by calling the enemy methode healthlosed.
     * 
     * @param enemy The character to inflict damage upon.
     * @param multiplicate The multiplier to apply to the damage (default: 1).
     */
    protected damage(enemy:Character,multiplicate:number=1) {
        enemy.healthLosed(this.attack,multiplicate)
    }

    /**
     * Calculates the amount of health lost by the character based on received damage.
     * 
     * @param receiveDamage The amount of damage received.
     * @param multiplicate The multiplier to apply to the received damage.
     */
    public healthLosed(receveDamage:number,multiplicate:number=1):void{
        if (receveDamage > this.defense+2){
            this.currentHp= Math.max(this.currentHp-(Math.round((receveDamage - this.defense)*multiplicate)),0)
        } else {
            this.currentHp= Math.max(this.currentHp-2,0)
        }
    }

    /**
     * Defines the behavior of the character during its turn in combat.
     * 
     * @param player An array of player characters.
     * @param monster An array of monster characters.
     * @returns the message/ description of the actions played (who attacked who)
     */
    public abstract playTurn(player:Character[],monster:Character[]):Promise<string> | string


    /**
     * Performs a special attack on the specified enemy character.
     * 
     * @param enemy The character to target with the special attack.
     * @returns An object describing the result of the special attack.
     */
    public abstract specialAttack(enemy:Character):ObjectReturn

    /**
     * Restores a percentage of the character's health.
     * 
     * @param percent The percentage of health to restore.
     * @param typeHeal The type of healing (default: "heal").
     */
    public heal(percent : number,typeHeal:string="heal"):ObjectReturn {
        if(typeHeal==="heal" && this.currentHp<=0){
            return {play:false,object:"You can't heal a dead character !"}
        } else {
            if(this.maxHp < this.currentHp + this.maxHp*(percent/100)) {
                this.currentHp = this.maxHp
            } else {
                this.currentHp += Math.round(this.maxHp*(percent/100))
            }
            return {play:true ,object:null}
        }
    }

    /**
     * Resurrects the character if it is dead and call the method heal to restore hp to the character.
     * 
     * @param percent The percentage of health to restore upon resurrection.
     */
    public resurrect(percent : number):void {
            this.heal(percent,"resurrect")
    }

    private getName():string{
        let name = "";
        const names = ["Cat Edral","Chat Po","Chat Moussa","Chat Teau","Chat Peliet","Chat Odo","Chat Pito","Chat Mourail","Chat Féplèze","Cat Aliseurre","Cat Olic","Chat Cal","Chat Creubleu","Chat Racreauch","Chat Meaux","Chat Rebond","Cat Aracte","Cat Astraufik","Chat Maleau","Cat Treuh","Cat Taugrafi","Cat Pouchinau","Cat Hin","Chat Soeur", "Chat Prystit"];
        const index = Math.floor(Math.random()*names.length);
        name = names[index];
        return name
    }
}
