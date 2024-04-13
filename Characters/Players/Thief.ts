import Character from "../Character.ts";
import Menu from "../../Menu.ts";
import Inventory from "../../Inventory.ts";
import Player from "../Player.ts";
import { ObjectReturn } from "../objectReturn.ts";
import Augmentor from "../Monsters/Augmentor.ts";
import Monster from "../Monster.ts"

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
            stealObject = "halfStar"
        } else if(5<=stealNumber && stealNumber<20) {
            stealObject = "starFragment"
        } else if (60<=stealNumber && stealNumber<90){
            stealObject = "potion"
        } else if (90<=stealNumber){
            stealObject = "ether"
        } else {
            stealObject = null
        }
        return {play:true,object:stealObject}
    }

    /**
     * Defines the behavior of the thief character during its turn in combat.
     * 
     * @param players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public playTurn(players:Player[],monsters:Monster[]){
        let menu = new Menu("What do you want to do?", ["Normal Attack","Special Attack","inventary"])
        let choice=menu.input()
        switch (choice){
            case 0:
                menu = new Menu("who do you want to attack?", Inventory.inventory.listNameCharacter(monsters))
                choice = menu.input()
                if (choice===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                }else{
                    this.damage(monsters[choice])
                    console.log(`You've made dammage to the ${monsters[choice].className}.`)
                    if (monsters[choice] instanceof Augmentor){
                        monsters[choice].damageReceve()
                    }
                }
                break
            case 1:
                menu = new Menu("who do you want to attack?", Inventory.inventory.listNameCharacter(monsters))
                choice = menu.input()
                if (choice===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                }else{
                    const action:ObjectReturn=this.specialAttack(monsters[choice])
                    if (action['object'] === null) {
                        console.log(`You've stole nothing, your character missed!`)
                    } else {
                        console.log(`You've stole the object: ${action['object']}.`)
                    }
                }
                break
            case 2:
                if(!Inventory.inventory.inventoryManager()){
                    this.playTurn(players,monsters)
                }
                break
            default:
                console.log("You can't make this choice, choose an other one")
                this.playTurn(players,monsters)
                
        }
    }
}