import Character from "../Character.ts";
import Menu from "../../Menu.ts";
import Monster from "../Monster.ts";
import Inventory from "../../Inventory.ts";
import Player from "../Player.ts";


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
    public specialAttack(enemy : Character) : object{
        if (this.manaNow - (this.manaMax*(35/100))>= 0){
            this.manaNow -= (this.manaMax*(35/100))
            enemy.currentHp -= this.attack
            return {play:true,nameMonster:enemy.className}
        }
        return {play:false,stealObject:null}
    }

    /**
     * Defines the behavior of the mage character during its turn in combat.
     * 
     * @param players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public playTurn(players:Player[],monsters:Monster[]){
        this.gainMana(10)
        let menu = new Menu("What do you want to do?", ["Normal Attack","Special Attack","inventary"])
        let choice=menu.input()
        switch (choice){
            case 0:
                menu = new Menu("who do you want to attack?", Inventory.inventory.listNameCharacter(monsters))
                choice = menu.input()
                if (choice===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.manaNow-=((10/100)*this.manaMax)
                    this.playTurn(players,monsters)
                    break;
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
                    this.manaNow-=((10/100)*this.manaMax)
                    this.playTurn(players,monsters)
                    break;
                }else{
                    const action:object=this.specialAttack(monsters[choice])
                    if (action['play']===true){
                        console.log(`You've made dammage to the ${monsters[choice].className}.`)
                        if (monsters[choice].className==="augmentor"){
                            monsters[choice].damageReceve()
                        }
                    } else {
                        console.log("You can't make this choice, your character has not enougth mana to do his special attack")
                        this.manaNow-=((10/100)*this.manaMax)
                        this.playTurn(players,monsters)
                    }
                }
                break
            case 2:
                if(!Inventory.inventory.inventoryManager()){
                    this.manaNow-=((10/100)*this.manaMax)
                    this.playTurn(players,monsters)
                }
                break
            default:
                console.log("You can't make this choice, choose an other one")
                this.manaNow-=((10/100)*this.manaMax)
                this.playTurn(players,monsters)
                
        }
    }
}