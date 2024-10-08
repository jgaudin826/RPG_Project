import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";

/**
 * Class representing a zombie monster character, inheriting from Monster.
 */
export default class Zombie extends Monster{
    public className:string="Zombie";
    public speedPosition:number=this.speed;

    /**
     * Creates an instance of Zombie with random or specified attributes.
     * 
     * @param attack The attack value of the zombie (default: random value between 40 and 59).
     * @param defense The defense value of the zombie (default: random value between 20 and 29).
     * @param speed The speed value of the zombie (default: random value between 90 and 110).
     * @param maxHp The maximum HP of the zombie (default: random value between 180 and 220).
     */
    public constructor(attack : number = Math.floor((Math.random() * 20)+30), 
                defense : number = Math.floor((Math.random() * 10)+20), 
                speed : number= Math.floor((Math.random() * 21)+90), 
                maxHp :number= Math.floor((Math.random()*41)+180),
                manaMax : number=0,
                divinPowerMax : number =0
                ){
        super(attack,defense,speed,maxHp,manaMax,divinPowerMax)
    }

    /**
     * Defines the behavior of the zombie character during its turn in combat.
     * 
     * @param players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public playTurn(players:Player[],_monsters:Monster[]) : string{
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
