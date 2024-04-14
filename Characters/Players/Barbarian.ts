import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";
import Screen from "../../Screen.ts";
import Augmentor from "../Monsters/Augmentor.ts";
import { ObjectReturn } from "../objectReturn.ts";

/**
 * Class representing a barbarian player character, inheriting from Player.
 */
export default class Barbarian extends Player{
    public className:string="Barbarian";
    public speedPosition:number=this.speed;

    /**
     * Creates an instance of Barbarian with random or specified attributes.
     * 
     * @param attack The attack value of the barbarian (default: random value between 70 and 89).
     * @param defense The defense value of the barbarian (default: random value between 15 and 24).
     * @param speed The speed value of the barbarian (default: random value between 100 and 109).
     * @param maxHp The maximum HP of the barbarian (default: random value between 200 and 209).
     */
    public constructor(attack : number = Math.floor((Math.random() * 20)+70), 
                defense : number = Math.floor((Math.random() * 10)+15), 
                speed : number= Math.floor((Math.random() * 10)+100), 
                maxHp :number= Math.floor((Math.random() * 10)+200)
                ){
        super(attack,defense,speed,maxHp)
    }

    /**
     * Performs a special attack on the specified enemy character.
     * 
     * @param enemy The character to target with the special attack.
     * @returns An object describing the result of the special attack.
     */
    public specialAttack(enemy:Character):ObjectReturn{
        if (this.currentHp- (this.maxHp*(20/100)) > 0){
            this.currentHp -= Math.round(this.maxHp*(20/100))
            this.damage(enemy,1.3)
            return {play:true,object:enemy.className}
        }
        return {play:false,object:null}
    }

    /**
     * Defines the behavior of the barbarian character during its turn in combat.
     * 
     * @param _players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public async playTurn(_players:Player[],monsters:Monster[]) : Promise<string>{
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
                    choice = await Screen.screen.input("who do you want to attack?",monsters.map((v) => `${v.name} (${v.className.slice(0,3)})`).concat(["Go back"]))
                    if (choice == monsters.length){
                        break
                    }else{
                        const action:ObjectReturn=this.specialAttack(monsters[choice])
                        if (action['play']===true){
                            if (monsters[choice].className==="Augmentor"){
                                monsters[choice].damageReceve()
                            }
                            return `You've made dammage to the ${monsters[choice].className}.`
                        } else {
                            Screen.screen.displayScreen("You can't make this choice, your character has not enougth hp to do his special attack")
                            await this.timeout(2000)
                            break
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

    /**
     * Used to display screen longer in order to have time to read
     * 
     * @param ms : delai in miliseconds
     * @returns a promise lasting that amount of time
     */
    public timeout (ms : number) {
        return new Promise(res => setTimeout(res,ms));
    }
}