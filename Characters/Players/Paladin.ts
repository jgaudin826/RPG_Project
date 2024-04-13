import Character from "../Character.ts";
import Menu from "../../Menu.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";
import Inventory from "../../Inventory.ts";
import { ObjectReturn } from "../objectReturn.ts";
import Augmentor from "../Monsters/Augmentor.ts"

/**
 * Class representing a paladin player character, inheriting from Player.
 */
export default class Paladin extends Player{
    public className:string="Paladin";
    public speedPosition:number=this.speed;

    /**
     * Creates an instance of Paladin with random or specified attributes.
     * 
     * @param attack The attack value of the paladin (default: random value between 50 and 69).
     * @param defense The defense value of the paladin (default: random value between 40 and 49).
     * @param speed The speed value of the paladin (default: random value between 100 and 119).
     * @param maxHp The maximum HP of the paladin (default: random value between 200 and 219).
     */
    constructor(attack : number = Math.floor((Math.random() * 20)+50), 
                defense : number = Math.floor((Math.random() * 10)+40), 
                speed : number= Math.floor((Math.random() * 20)+100), 
                maxHp :number= Math.floor((Math.random() * 20)+200)
                ){
        super(attack,defense,speed,maxHp)
    }

    /**
     * Performs a special attack on all enemy characters.
     * 
     * @param enemy The character to target with the special attack.
     * @returns An object describing the result of the special attack.
     */
    public specialAttack(enemy : Character):ObjectReturn {
        this.damage(enemy,0.4)
        return {play:true,object:null} 
    }

    /**
     * Defines the behavior of the paladin character during its turn in combat.
     * 
     * @param players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public playTurn(players:Player[],monsters:Monster[]){
        let menu = new Menu("What do you want to do?", ["Normal Attack","Special Attack","inventary"])
        let choice=menu.input()
        switch (choice){
            case 0:
                console.log("here")
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
                monsters.forEach(monster=>{
                    this.specialAttack(monster)
                    if (monster instanceof Augmentor){
                        monster.damageReceve()
                    }
                })
                console.log(`All enemy have taken damage.`)
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