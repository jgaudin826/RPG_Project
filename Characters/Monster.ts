import Character from "./Character.ts";


export default class Monster extends Character{
    playerWithLowestHP(characters:Character[]):Character{
        let player : Character =characters[0]
        let lowerHP : number = characters[0].currentHp
        characters.forEach(character => {
            if ((character.currentHp/character.maxHp)*100<(lowerHP/character.maxHp)*100){
                player=character
                lowerHP=character.currentHp
            }
        });
        return player
    }
}
