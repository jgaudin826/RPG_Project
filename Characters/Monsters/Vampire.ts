import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";
import { ObjectReturn } from "../objectReturn.ts";


/**
 * Class representing a vampire monster character, inheriting from Monster.
 */
export default class vampire extends Monster{
    public className:string="Vampire";
    public speedPosition:number=this.speed;

    /**
     * Creates an instance of Vampire with random or specified attributes.
     * 
     * @param attack The attack value of the vampire (default: random value between 70 and 89).
     * @param defense The defense value of the vampire (default: random value between 15 and 19).
     * @param speed The speed value of the vampire (default: random value between 95 and 104).
     * @param maxHp The maximum HP of the vampire (default: random value between 165 and 184).
     */
    public constructor(attack : number = Math.floor((Math.random() * 20)+55), 
                defense : number = Math.floor((Math.random() * 5)+15), 
                speed : number= Math.floor((Math.random() * 10)+95), 
                maxHp :number= Math.floor((Math.random() * 20)+165)
                ){
        super(attack,defense,speed,maxHp)
    }

    /**
     * Performs the special attack of the vampire, dealing damage to the enemy and healing itself.
     * 
     * @param enemy The character to attack.
     * @returns An object indicating the success of the special attack (always true) and no stolen object.
     */
    public specialAttack(enemy:Character):ObjectReturn{
        this.damage(enemy)
        this.heal((Math.floor(Math.random() * 6)+5))
        return {play:true,object:null}
    }

    /**
     * Defines the behavior of the vampire character during its turn in combat.
     * 
     * @param players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public playTurn(players:Player[],_monsters:Monster[]) : string{
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
        return `${this.className} has made dammage to the ${intendedCharacter.className}: ${Math.max((this.attack - intendedCharacter.defense),2)}.`
    }
}