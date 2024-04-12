import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";

/**
 * Class representing an augmentor monster character, inheriting from Monster.
 */
export default class augmentor extends Monster{
    public className:string="Augmentor";
    public orbe : string[] =[]
    public boostCount:number=0
    public speedPosition:number=this.speed;

    /**
     * Creates an instance of Augmentor with random or specified attributes.
     * 
     * @param attack The attack value of the augmentor (default: random value between 50 and 59).
     * @param defense The defense value of the augmentor (default: random value between 25 and 34).
     * @param speed The speed value of the augmentor (default: random value between 100 and 109).
     * @param maxHp The maximum HP of the augmentor (default: random value between 195 and 204).
     */
    public constructor(attack : number = Math.floor((Math.random() * 10)+50), 
                defense : number = Math.floor((Math.random() * 10)+25), 
                speed : number= Math.floor((Math.random() * 10)+100), 
                maxHp :number= Math.floor((Math.random() * 10)+195)
                ){
        super(attack,defense,speed,maxHp)
    }

    /**
     * Performs the ritual of the augmentor, adding an orb and boosting its attributes accordingly.
     */
    private rituel(){
        if (this.orbe.length<5){
            this.orbe.push("")
            this.boost()
        }
    }

    /**
     * Boosts the attributes of the augmentor based on the number of orbs possessed.
     */
    private boost(){
        this.maxHp=this.maxHp-(3*this.boostCount)+(3*this.orbe.length)
        this.currentHp=this.currentHp-(3*this.boostCount)+(3*this.orbe.length)
        this.attack=this.attack-(3*this.boostCount)+(3*this.orbe.length)
        this.defense=this.defense-(3*this.boostCount)+(3*this.orbe.length)
        this.boostCount = this.orbe.length
    }

    /**
     * Handles the damage received by the augmentor, reducing the number of orbs and adjusting its attributes.
     */
    public damageReceve(){
        if (this.orbe.length>=1){
            this.orbe.pop()
            this.boost()
            console.log(`The ${this.className} has taken made dammage so he lost an orbe.`)
        }
    }

    /**
     * Defines the behavior of the augmentor character during its turn in combat.
     * 
     * @param players An array of player characters.
     * @param monsters An array of monster characters.
     */
    public playTurn(players:Player[],monsters:Monster[]){
        this.rituel()
        let intendedCharacter : Character = players[0]
        let whichEnnemi :number = Math.floor(Math.random() * 10)
        if (whichEnnemi>3 && whichEnnemi<6){
            intendedCharacter = this.playerWithLowestHP(players)
        } else {
            intendedCharacter = players[Math.floor(Math.random() * players.length)]
        }
        this.damage(intendedCharacter)
        console.log(`${this.className} has made dammage to the ${intendedCharacter.className}:`+(this.attack - intendedCharacter.defense)+".")
    }
}