import Character from "../character.ts"

export default class Paladin extends Character{
    saintAttack(enemy : Character) : boolean{
        enemy.currentHP -= ((this.attack - enemy.defense)*0.4)
        return true
    }
}