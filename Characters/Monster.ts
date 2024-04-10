import Character from "./Character.ts";

export default class Monster extends Character{
    public damageReceve(){}
    
    protected playerWithLowestHP(characters:Character[]):Character{
        let player : Character =characters[0]
        let lowerHP : number = characters[0].currentHP
        characters.forEach(character => {
            if ((character.currentHP/character.maxHP)*100<(lowerHP/character.maxHP)*100){
                player=character
                lowerHP=character.currentHP
            }
        });
        return player
    }
}
