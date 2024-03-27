import Character from "../character.ts";
import Menu from "../../menu.ts";
import Player from "../Player.ts";

export default class Priest extends Player{
    className:string="priest";
    constructor(name :string="priest",
                team:string="player",
                attack : number = Math.floor((Math.random() * 10)+40), 
                defense : number = Math.floor((Math.random() * 5)+10), 
                speed : number= Math.floor((Math.random() * 10)+95), 
                maxHp :number= Math.floor((Math.random() * 20)+190)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    specialAttack(ally : Character):object{
        if(ally.currentHp <= 0){
            console.log("On ne soigne pas un mort !")
        } else {
            if(ally.currentHp > ally.currentHp + ally.maxHp*(25/100)) {
                ally.currentHp = ally.maxHp
            } else {
                ally.currentHp += ally.maxHp*(25/100)
            }
        }
        return {play:true,namePlayer:ally.name}
    }
    playTurn(players:Character[],monsters:Character[]){
        let menu = new Menu("What do you want to do?", ["Normal Attack","Special Attack","Inventary","Quit"])
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
            case 1:
                menu = new Menu("who do you want to heal?", this.listNameCharacter(players))
                let numberPlayer = menu.input()
                if (numberPlayer===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                }else{
                    let action:object=this.specialAttack(players[numberPlayer])
                    console.log(`You've healed the ${action[1]}.`)
                }
            default:
                console.log("You can't make this choice, choose an other one")
                this.playTurn(players,monsters)
                
        }
    }
}