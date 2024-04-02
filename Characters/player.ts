import Character from "./Character.ts";

export default class Player extends Character{
    listNameCharacter(characters:Character[]):string[]{
        let listName:string[]=[]
        characters.forEach(Element => {
            listName.push(Element.className)
        });
        return listName
    }
}