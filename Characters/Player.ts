import Character from "./Character.ts"
import { ObjectReturn } from "./objectReturn.ts";
/**
 * Abstract class representing a player character, inheriting from Character.
 */
export default abstract class Player extends Character{
    /**
     * Performs a special attack on the specified enemy character.
     * 
     * @param enemy The character to target with the special attack.
     * @returns An object describing the result of the special attack.
     */
    public specialAttack(enemy : Character):ObjectReturn {return {play:false,object:enemy.name}}
}