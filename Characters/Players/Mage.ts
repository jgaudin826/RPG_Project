import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";
import { ObjectReturn } from "../objectReturn.ts";
import Augmentor from "../Monsters/Augmentor.ts"
import Screen from "../../Screen.ts";


/**
 * Class representing a mage player character, inheriting from Player.
 */
export default class Mage extends Player{
    public className:string="Mage";
    public manaNow : number;
    public manaMax : number;
    public speedPosition:number=this.speed;

    /**
     * Creates an instance of Mage.
     * 
     * @param attack The attack value of the mage (default: random value between 35 and 44).
     * @param defense The defense value of the mage (default: random value between 10 and 14).
     * @param speed The speed value of the mage (default: random value between 115 and 124).
     * @param maxHp The maximum HP of the mage (default: random value between 190 and 209).
     * @param manaMax The maximum amount of mana the mage can have (default: 100).
     */
    public constructor(attack : number = Math.floor((Math.random() * 10)+35), 
                defense : number = Math.floor((Math.random() * 5)+10), 
                speed : number= Math.floor((Math.random() * 10)+115), 
                maxHp :number= Math.floor((Math.random() * 20)+190),
                manaMax : number= 100
                ){
        super(attack,defense,speed,maxHp)
        this.manaMax = manaMax
        this.manaNow = manaMax
    }

    /**
     * Increases the mage's current mana by a certain percentage of its maximum mana.
     * 
     * @param percent The percentage of maximum mana to increase the current mana by.
     */
    public gainMana(percent : number){
        this.manaNow += (this.manaMax*(percent/100))
        if (this.manaNow > this.manaMax) this.manaNow = this.manaMax
    }

    /**
     * Performs a special attack on the specified enemy character.
     * 
     * @param enemy The character to target with the special attack.
     * @returns An object describing the result of the special attack.
     */
    public specialAttack(enemy : Character) : ObjectReturn{
        if (this.manaNow - (this.manaMax*(35/100))>= 0){
            this.manaNow = Math.max(this.manaNow -this.manaMax*(35/100),0)
            enemy.currentHp -= this.attack
            return {play:true,object:enemy.className}
        }
        return {play:false,object:null}
    }

    /**
     * Defines the behavior of the mage character during its turn in combat.
     * 
     * @param players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public async playTurn(players:Player[],monsters:Monster[]) : Promise<string> {
        while (true) {
            let choice = await Screen.screen.input(`What do you want ${this.name} (${this.className.slice(0,3)}) to do?`,["Normal Attack","Special Attack","Inventory"])
            switch (choice){
                case 0: {
                    choice = await Screen.screen.input("who do you want to attack?",monsters.map((v) => `${v.name} (${v.className.slice(0,3)})`).concat(["Go back"]))
                    if (choice===undefined){
                        console.log("You can't make this choice, choose an other one")
                        this.playTurn(players,monsters)
                        break;
                    }else {
                        this.gainMana(10)
                        this.damage(monsters[choice])
                        if (monsters[choice] instanceof Augmentor){
                            monsters[choice].damageReceve()
                        }
                        return `You've made dammage to the ${monsters[choice].className}.`
                    }
                }
                case 1: {
                    choice = await Screen.screen.input("who do you want to attack?",monsters.map((v) => `${v.name} (${v.className.slice(0,3)})`).concat(["Go back"]))
                    if (choice == 3){
                        break
                    }else{
                        const action:ObjectReturn=this.specialAttack(monsters[choice])
                        if (action['play']===true){
                            if (monsters[choice] instanceof Augmentor){
                                monsters[choice].damageReceve()
                            }
                            return `You've made dammage to the ${monsters[choice].className}.`
                        } else {
                            Screen.screen.printMessage("You can't make this choice, your character has not enougth mana to do his special attack")
                            break
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