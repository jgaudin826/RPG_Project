export default class Character {
    name : string;
    attackValue : number; 
    defenseValue : number;
    speedValue : number; 
    maxHp : number;
    currentHp : number;

    constructor(name : string, attackValue : number, defenseValue : number,speedValue : number, maxHp : number, currentHp : number,){
        this.name = name
        this.attackValue = attackValue;
        this.defenseValue = defenseValue;
        this.speedValue = speedValue;
        this.maxHp = maxHp;
        this.currentHp = currentHp;
    }
}
