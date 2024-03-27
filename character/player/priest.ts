import Character from "../character.ts"

export default class Priest extends Character{
    className:string="priest";
    constructor(name :string="priest",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100)
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
        return {play:true,stealObject:null}
    }
    playTurn(players:Character[],monsters:Character[]){
    }
}