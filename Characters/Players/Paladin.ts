import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";
import { ObjectReturn } from "../objectReturn.ts";
import Augmentor from "../Monsters/Augmentor.ts"
import Screen from "../../Screen.ts"

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
     * @param _players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public async playTurn(_players:Player[],monsters:Monster[]): Promise<string> {
        while (true) {
            let choice = await Screen.screen.input(`What do you want ${this.name} (${this.className.slice(0,3)}) to do?`,["Normal Attack","Special Attack","Inventory"])
            switch (choice){
                case 0: {
                    choice = await Screen.screen.input("who do you want to attack?",monsters.map((v) => `${v.name} (${v.className.slice(0,3)})`).concat(["Go back"]))
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
                    monsters.forEach(monster=>{
                        this.specialAttack(monster)
                        if (monster instanceof Augmentor){
                            monster.damageReceve()
                        }
                    })
                    return `All enemy have taken damage.`
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