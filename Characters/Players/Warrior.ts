import Character from "../Character.ts"
import Menu from "../../Menu.ts"
import Player from "../Player.ts";
import Monster from "../Monster.ts";

export default class Warrior extends Player{
    public className:string="Warrior";
    public constructor(attack : number = Math.floor((Math.random() * 20)+60), 
                defense : number = Math.floor((Math.random() * 10)+35), 
                speed : number= Math.floor((Math.random() * 11)+95), 
                maxHp :number= Math.floor((Math.random() * 20)+190)
                ){
        super(attack,defense,speed,maxHp)
    }
    public playTurn(players:Player[],monsters:Monster[]){
        let menu = new Menu("What do you want to do?", ["Normal Attack","Quit"])
        let choice=menu.input()
        switch (choice){
            case 0:
                menu = new Menu("who do you want to attack?", this.listNameCharacter(monsters))
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
            default:
                console.log("You can't make this choice, choose an other one")
                this.playTurn(players,monsters)      
        }
    }
}