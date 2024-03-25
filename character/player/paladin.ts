import Character from "../character.ts"

export default class Paladin extends Character{
    saintAttack(enemy : Character) : boolean{
        enemy.currentHp -= ((this.attack - enemy.defense)*0.4)
        return true
    }
}