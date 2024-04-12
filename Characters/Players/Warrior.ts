import Menu from "../../Menu.ts"
import Player from "../Player.ts";
import Inventory from "../../Inventory.ts";
import Monster from "../Monster.ts";

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
     * @param players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public playTurn(players:Player[],monsters:Monster[]){
        let menu = new Menu("What do you want to do?", ["Normal Attack","inventary"])
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
                    if (monsters[choice].className==="augmentor"){
                        monsters[choice].damageReceve()
                    }
                }
                break
            case 1:
                if(!Inventory.inventory.inventoryManager()){
                    this.playTurn(players,monsters)
                }else {

                }
                break
            default:
                console.log("You can't make this choice, choose an other one")
                this.playTurn(players,monsters)      
        }
    }
}