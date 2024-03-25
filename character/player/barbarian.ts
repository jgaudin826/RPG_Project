import Character from "../character.ts"

export default class Barbarian extends Character{
    berserkAttack(enemy:Character):boolean{
        if (this.currentHP- (this.hpMax*(20/100)) > 0){
            this.currentHP -= (this.hpMax*(20/100))
            enemy.currentHP -= ((this.attack - enemy.defense)*1.3)
            return true
        }
        return false
    }
}