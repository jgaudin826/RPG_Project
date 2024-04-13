import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";
import { ObjectReturn } from "../objectReturn.ts";
import Augmentor from "../Monsters/Augmentor.ts"
import Screen from "../../Screen.ts";

/**
 * Class representing a priest player character, inheriting from Player.
 */
export default class Priest extends Player{
    public className:string="Priest";
    public speedPosition:number=this.speed;

    /**
     * Creates an instance of Priest with random or specified attributes.
     * 
     * @param attack The attack value of the priest (default: random value between 40 and 49).
     * @param defense The defense value of the priest (default: random value between 10 and 14).
     * @param speed The speed value of the priest (default: random value between 95 and 104).
     * @param maxHp The maximum HP of the priest (default: random value between 190 and 209).
     */
    public constructor(attack : number = Math.floor((Math.random() * 10)+40), 
                defense : number = Math.floor((Math.random() * 5)+10), 
                speed : number= Math.floor((Math.random() * 10)+95), 
                maxHp :number= Math.floor((Math.random() * 20)+190)
                ){
        super(attack,defense,speed,maxHp)
    }

    /**
     * Performs a special healing on the specified ally character.
     * 
     * @param ally The character to target with the special healing.
     * @returns An object describing the result of the special healing.
     */
    public specialAttack(ally : Character):ObjectReturn{
            const healed=ally.heal(25)
        return {play:healed,object:ally.className}
    }

    /**
     * Defines the behavior of the priest character during its turn in combat.
     * 
     * @param players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public async playTurn(players:Player[],monsters:Monster[]) : Promise<string> {
        while (true) {
            let choice = await Screen.screen.input("What do you want to do?",["Normal Attack","Special Attack","Inventory"])
            switch (choice){
                case 0: {
                    choice = await Screen.screen.input("who do you want to attack?",monsters.map((v) => `${v.name} (${v.className})`).concat(["Go back"]))
                    if (choice == 3){
                        break
                    }else{
                        this.damage(monsters[choice])
                        if (monsters[choice] instanceof Augmentor){
                            monsters[choice].damageReceve()
                        }
                        return `You've made dammage to the ${monsters[choice].className}.`
                    }
                }
                case 1: {
                    choice = await Screen.screen.input("who do you want to attack?",monsters.map((v) => `${v.name} (${v.className})`).concat(["Go back"]))
                    if (choice == 3){
                        break
                    }else{
                        const action:ObjectReturn=this.specialAttack(players[choice])
                        if (action['play']===false){
                            break
                        }else {
                            return `You've healed the ${action['object']}.`
                        }
                    }
                }
                case 2: {
                    const action = await Screen.screen.inventory()
                    if(action.length != 0) {
                        return `You have used an item`
                    }
                    break
                }
            }   
        }
    }
}