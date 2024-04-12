import Character from "../Character.ts";
import Menu from "../../Menu.ts";
import Monster from "../Monster.ts";
import Inventory from "../../Inventory.ts";
import Player from "../Player.ts";

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
    public specialAttack(enemy:Character):object{
        if (this.currentHp- (this.maxHp*(20/100)) > 0){
            this.currentHp -= (this.maxHp*(20/100))
            this.damage(enemy,1.3)
            return {play:true,nameMonster:enemy.className}
        }
        return {play:false,stealObject:null}
    }

    /**
     * Defines the behavior of the barbarian character during its turn in combat.
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
                    if (monsters[choice].className==="augmentor"){
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
                    const action:object=this.specialAttack(monsters[choice])
                    if (action['play']===true){
                        console.log(`You've made dammage to the ${monsters[choice].className}.`)
                        if (monsters[choice].className==="augmentor"){
                            monsters[choice].damageReceve()
                        }
                    } else {
                        console.log("You can't make this choice, your character has not enougth hp to do his special attack")
                        this.playTurn(players,monsters)
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