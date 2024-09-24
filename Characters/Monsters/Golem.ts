import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";
import { ObjectReturn } from "../objectReturn.ts";

/**
 * Class representing a golem monster character, inheriting from Monster.
 */
export default class Golem extends Monster{
    public className:string="Golem";
    public speedPosition:number=this.speed;

    /**
     * Creates an instance of Golem with random or specified attributes.
     * 
     * @param attack The attack value of the golem (default: random value between 60 and 69).
     * @param defense The defense value of the golem (default: random value between 45 and 54).
     * @param speed The speed value of the golem (default: random value between 50 and 69).
     * @param maxHp The maximum HP of the golem (default: random value between 400 and 449).
     */
    public constructor(attack : number = Math.floor((Math.random() * 10)+45), 
                defense : number = Math.floor((Math.random() * 10)+45), 
                speed : number= Math.floor((Math.random() * 20)+50), 
                maxHp :number= Math.floor((Math.random() * 50)+250),
                manaMax : number=0,
                divinPowerMax : number =0
                ){
        super(attack,defense,speed,maxHp,manaMax,divinPowerMax)
    }

    /**
     * Performs the special attack of the golem, dealing reduced damage to the enemy.
     * 
     * @param enemy The character to attack.
     * @returns An object indicating the success of the special attack (always true) and no stolen object.
     */
    public specialAttack(enemy:Character):ObjectReturn{
        this.damage(enemy,0.3)
        return {play:true,object:null}
    }

    /**
     * Defines the behavior of the golem character during its turn in combat.
     * 
     * @param players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public playTurn(players:Player[],_monsters:Monster[]) : string{
        const whichAttack :number = Math.floor(Math.random() * 3)
        if (whichAttack===0){
            players.forEach(player=>{
                this.specialAttack(player)
            })
            return `${this.className} has made dammage to all of your players`
        }else{
            let intendedCharacter : Character = players[0]
            const whichEnnemi :number = Math.floor(Math.random() * 10)
            if (whichEnnemi>3 && whichEnnemi<6){
                intendedCharacter = this.playerWithLowestHP(players)
            } else {
                intendedCharacter = players[Math.floor(Math.random() * players.length)]
            }
            this.damage(intendedCharacter)
            return `${this.className} has made dammage to the ${intendedCharacter.className}: ${Math.max((this.attack - intendedCharacter.defense),2)}.`
        }
    }
}