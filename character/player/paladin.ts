import Character from "../character.ts"

export default class Paladin extends Character{
    constructor(name :string="paladin",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100),
                manaNow : number= Math.floor(Math.random() * 100),
                manaMax : number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
}
    saintAttack(enemies : Character[]) {
        enemies.forEach(enemy => {
            enemy.currentHp -= ((this.attack - enemy.defense)*0.4)
        });    
    }
}