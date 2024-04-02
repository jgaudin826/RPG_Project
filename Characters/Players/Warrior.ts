import Character from "../Character.ts"
import Menu from "../../Menu.ts"
import Player from "../Player.ts";

export default class Warrior extends Player{
    className:string="Warrior";
    constructor(name :string="Warrior",
                team:string="player",
                attack : number = Math.floor((Math.random() * 20)+60), 
                defense : number = Math.floor((Math.random() * 10)+35), 
                speed : number= Math.floor((Math.random() * 11)+95), 
                maxHp :number= Math.floor((Math.random() * 20)+190)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    playTurn(players:Character[],monsters:Character[]){
        let menu = new Menu("What do you want to do?", ["Normal Attack","Inventary","Quit"])
        const choice=menu.input()
        switch (choice){
            case 0:
                menu = new Menu("who do you want to attack?", this.listNameCharacter(monsters))
                let numberMonster = menu.input()
                if (numberMonster===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                }else{
                    this.damage(monsters[numberMonster])
                    console.log(`You've made dammage to the ${monsters[numberMonster].name}.`)
                }
            default:
                console.log("You can't make this choice, choose an other one")
                this.playTurn(players,monsters)
                
        }
    }
}