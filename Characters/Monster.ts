import Character from "./Character.ts";
import { ObjectReturn } from "./objectReturn.ts";

/**
 * Abstract class representing a monster character, inheriting from Character.
 */
export default abstract class Monster extends Character{
    
    /**
     * Placeholder method for receiving damage. Implement in derived classes as needed.
     */
    public damageReceve(){}

    /**
     * Performs a special attack on the specified enemy character.
     * 
     * @param enemy The character to target with the special attack.
     * @returns An object describing the result of the special attack.
     */
    public specialAttack(enemy : Character):ObjectReturn {return {play:false,object:enemy.name}}

    /**
     * Finds and returns the player character with the lowest current HP.
     * 
     * @param characters An array of characters to search.
     * @returns The player character with the lowest current HP.
     */
    protected playerWithLowestHP(characters:Character[]):Character{
        let player : Character =characters[0]
        let lowerHP : number = characters[0].currentHp
        characters.forEach(character => {
            if ((character.currentHp/character.maxHp)*100<(lowerHP/character.maxHp)*100){
                player=character
                lowerHP=character.currentHp
            }
        });
        return player
    }
}
