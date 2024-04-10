import Character from "../Character.ts";
import Menu from "../../Menu.ts";
import Monster from "../Monster.ts";
import Inventory from "../../Inventory.ts";
import Player from "../Player.ts";

export default class Priest extends Player{
    public className:string="Priest";
    public constructor(attack : number = Math.floor((Math.random() * 10)+40), 
                defense : number = Math.floor((Math.random() * 5)+10), 
                speed : number= Math.floor((Math.random() * 10)+95), 
                maxHp :number= Math.floor((Math.random() * 20)+190)
                ){
        super(attack,defense,speed,maxHp)
    }
    public specialAttack(ally : Character):object{
            ally.heal(25)
        return {play:true,namePlayer:ally.className}
    }
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
                menu = new Menu("who do you want to heal?", Inventory.inventory.listNameCharacter(players))
                let numberPlayer = menu.input()
                if (numberPlayer===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                }else{
                    let action:object=this.specialAttack(players[numberPlayer])
                    console.log(`You've healed the ${action[1]}.`)
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