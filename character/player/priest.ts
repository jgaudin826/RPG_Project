import Character from "../character.ts"

export default class Priest extends Character{
    specialHeal(ally : Character){
        ally.heal(25)
    }
}