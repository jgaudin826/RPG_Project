import Character from "../character.ts"

export default class Priest extends Character{
    specialAbility(ally : Character):object{
        ally.heal(25)
        return {Bool:true}
    }
}