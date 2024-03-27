import Character from "../character.ts";
import Menu from "../../menu.ts";
import Player from "../Player.ts";

export default class Barbarian extends Player{
    className:string="barbarian";
    constructor(name :string="barbarian",
                team:string="player",
                attack : number = Math.floor((Math.random() * 20)+70), 
                defense : number = Math.floor((Math.random() * 10)+15), 
                speed : number= Math.floor((Math.random() * 10)+100), 
                maxHp :number= Math.floor((Math.random() * 10)+200)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    specialAttack(enemy:Character):object{
        if (this.currentHp- (this.maxHp*(20/100)) > 0){
            this.currentHp -= (this.maxHp*(20/100))
            enemy.currentHp -= ((this.attack - enemy.defense)*1.3)
            return {play:true,nameMonster:enemy.name}
        }
        return {play:false,stealObject:null}
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
                menu = new Menu("who do you want to attack?", this.listNameCharacter(monsters))
                numberMonster = menu.input()
                if (numberMonster===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                }else{
                    let action:object=this.specialAttack(monsters[numberMonster])
                    if (action[0]===true){
                        console.log(`You've made dammage to the ${monsters[numberMonster].name}.`)
                    } else {
                        console.log("You can't make this choice, your character has not enougth hp to do his special attack")
                    }
                    
                }
            default:
                console.log("You can't make this choice, choose an other one")
                this.playTurn(players,monsters)
                
        }
    }
}