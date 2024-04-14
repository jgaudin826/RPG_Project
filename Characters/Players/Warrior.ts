import Player from "../Player.ts";
import Monster from "../Monster.ts";
import Augmentor from "../Monsters/Augmentor.ts"
import Screen from "../../Screen.ts";

/**
 * Class representing a warrior player character, inheriting from Player.
 */
export default class Warrior extends Player{
    public className:string="Warrior";
    public speedPosition:number=this.speed;

    /**
     * Creates an instance of Warrior with random or specified attributes.
     * 
     * @param attack The attack value of the warrior (default: random value between 60 and 79).
     * @param defense The defense value of the warrior (default: random value between 35 and 44).
     * @param speed The speed value of the warrior (default: random value between 95 and 105).
     * @param maxHp The maximum HP of the warrior (default: random value between 190 and 209).
     */
    public constructor(attack : number = Math.floor((Math.random() * 20)+60), 
                defense : number = Math.floor((Math.random() * 10)+35), 
                speed : number= Math.floor((Math.random() * 11)+95), 
                maxHp :number= Math.floor((Math.random() * 20)+190)
                ){
        super(attack,defense,speed,maxHp)
    }

    /**
     * Defines the behavior of the warrior character during its turn in combat.
     * 
     * @param _players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public async playTurn(_players:Player[],monsters:Monster[]) : Promise<string> {
        while (true) {
            let choice = await Screen.screen.input(`What do you want ${this.name} (${this.className.slice(0,3)}) to do?`,["Normal Attack","Inventory"])
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