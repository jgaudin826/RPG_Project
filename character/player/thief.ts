import Character from "../character.ts"

export default class Thief extends Character{
    specialAbility():object {
        let stealObject : string | null
        let stealNumber : number = Math.floor(Math.random() * 100);
        if (stealNumber<5){
            stealObject = "halfStar"
        } else if(5<=stealNumber && stealNumber<20) {
            stealObject = "starFragment"
        } else if (60<=stealNumber && stealNumber<90){
            stealObject = "potion"
        } else if (90<=stealNumber){
            stealObject = "ether"
        } else {
            stealObject = null
        }
        return {Bool:true,stealObject:stealObject}
    }
}