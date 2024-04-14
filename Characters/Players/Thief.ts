import Character from "../Character.ts";
import Player from "../Player.ts";
import { ObjectReturn } from "../objectReturn.ts";
import Augmentor from "../Monsters/Augmentor.ts";
import Monster from "../Monster.ts"
import Screen from "../../Screen.ts";
import Inventory from "../../Inventory.ts";

/**
 * Class representing a thief player character, inheriting from Player.
 */
export default class Thief extends Player{
    public className:string="Thief";
    public speedPosition:number=this.speed;

    /**
     * Creates an instance of Thief with random or specified attributes.
     * 
     * @param attack The attack value of the thief (default: random value between 45 and 54).
     * @param defense The defense value of the thief (default: random value between 20 and 29).
     * @param speed The speed value of the thief (default: random value between 135 and 164).
     * @param maxHp The maximum HP of the thief (default: random value between 165 and 184).
     */
    public constructor(attack : number = Math.floor((Math.random() * 10)+45), 
                defense : number = Math.floor((Math.random() * 10)+20), 
                speed : number= Math.floor((Math.random() * 30)+135), 
                maxHp :number= Math.floor((Math.random() * 20)+165)
                ){
        super(attack,defense,speed,maxHp)
    }

    /**
     * Performs a special attack on the specified enemy character.
     * 
     * @param enemy The character to target with the special attack.
     * @returns An object describing the result of the special attack.
     */
    public specialAttack(_enemy:Character):ObjectReturn{
        let stealObject : string | null
        const stealNumber : number = Math.floor(Math.random() * 100);
        if (stealNumber<5){
            stealObject = "half star"
            Inventory.inventory.nHalfStars+=1
        } else if(5<=stealNumber && stealNumber<20) {
            stealObject = "star fragment"
            Inventory.inventory.nStarFragments+=1
        } else if (60<=stealNumber && stealNumber<90){
            stealObject = "potion"
            Inventory.inventory.nPotions+=1
        } else if (90<=stealNumber){
            stealObject = "ether"
            Inventory.inventory.nEthers+=1
        } else {
            stealObject = null
        }
        return {play:true,object:stealObject}
    }

    /**
     * Defines the behavior of the thief character during its turn in combat.
     * 
     * @param _players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public async playTurn(_players:Player[],monsters:Monster[]) : Promise<string> {
        while (true) {
            let choice = await Screen.screen.input(`What do you want ${this.name} (${this.className.slice(0,3)}) to do?`,["Normal Attack","Special Attack","Inventory"])
            switch (choice){
                case 0: {
                    choice = await Screen.screen.input("who do you want to attack?",monsters.map((v) => `${v.name} (${v.className.slice(0,3)})`).concat(["Go back"]))
                    if (choice == monsters.length){
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
                    choice = await Screen.screen.input("who do you want to steal from?",monsters.map((v) => `${v.name} (${v.className.slice(0,3)})`).concat(["Go back"]))
                    if (choice == monsters.length){
                        break
                    }else{
                        const action:ObjectReturn=this.specialAttack(monsters[choice])
                        if (action['object'] === null) {
                            return `You've stole nothing, your character missed!`
                        } else {
                            return `You've stole the object: ${action['object']}.`
                        }
                    }
                }
                case 2: {
                    const action = await Screen.screen.inventory()
                    if(action.length != 0) {
                        return action
                    }
                    break
                }
            }  
        }
    }
}