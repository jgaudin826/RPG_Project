import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";
import { ObjectReturn } from "../objectReturn.ts";

/**
 * Class representing an ogre monster character, inheriting from Monster.
 */
export default class Ogre extends Monster{
    public className:string="Ogre";
    public speedPosition:number=this.speed;

    /**
     * Creates an instance of Ogre with random or specified attributes.
     * 
     * @param attack The attack value of the ogre (default: random value between 55 and 64).
     * @param defense The defense value of the ogre (default: random value between 25 and 34).
     * @param speed The speed value of the ogre (default: random value between 75 and 84).
     * @param maxHp The maximum HP of the ogre (default: random value between 195 and 204).
     */
    public constructor(attack : number = Math.floor((Math.random() * 10)+55), 
                defense : number = Math.floor((Math.random() * 10)+25), 
                speed : number= Math.floor((Math.random() * 10)+75), 
                maxHp :number= Math.floor((Math.random() * 10)+195),
                ){
        super(attack,defense,speed,maxHp)
    }

    /**
     * Performs the special attack of the ogre, dealing increased damage to the enemy.
     * 
     * @param enemy The character to attack.
     * @returns An object indicating the failure of the special attack (always false) and no stolen object.
     */
    public specialAttack(enemy:Character):ObjectReturn{
        this.damage(enemy,1.5)   
        return {play:false,object:null}
    }

    /**
     * Defines the behavior of the ogre character during its turn in combat.
     * 
     * @param players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public playTurn(players:Player[],_monsters:Monster[]){
        let intendedCharacter : Character = players[0]
        const whichEnnemi :number = Math.floor(Math.random() * 10)
        const whichAttack :number = Math.floor(Math.random() * 3)
        if (whichEnnemi>3 && whichEnnemi<6){
            intendedCharacter = this.playerWithLowestHP(players)
        } else {
            intendedCharacter = players[Math.floor(Math.random() * players.length)]
        }
        if (whichAttack===0){
            this.specialAttack(intendedCharacter)
        }else{
            this.damage(intendedCharacter)
        }
        console.log(`${this.className} has made dammage to the ${intendedCharacter.className}:`+(this.attack - intendedCharacter.defense)+".")
    }
}
