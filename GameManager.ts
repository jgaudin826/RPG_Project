import Character from "./Characters/Character.ts"
import Warrior from "./Characters/Players/Warrior.ts"
import Mage from "./Characters/Players/Mage.ts"
import Paladin from "./Characters/Players/Paladin.ts"
import Barbarian from "./Characters/Players/Barbarian.ts"
import Priest from "./Characters/Players/Priest.ts"
import Thief from "./Characters/Players/Thief.ts"
import Fight from "./Fight.ts"
import Zombie from "./Characters/Monsters/Zombie.ts"
import Screen from "./Screen.ts";

export default class GameManagement {
    private static _game : GameManagement | null = null;
    players : Character[] = [];
    deadPlayers : Character[] = [];

    static get game() {
        if (this._game == null) {
            this._game = new GameManagement()
        }
        return this._game
    }

    private constructor() {}

    /**
     * GameManager.game.start() : to start game
     * 
     * Handles one game loop
     * 
     */
    async start(){
        // Choose Team
        this.players= await this.createTeam()

        // Figth 1
        await new Fight().startFight()
        await this.checkDeadCharacters()
        
        // Chest Room 1
        await this.chestRoom()
        await this.checkDeadCharacters()

        //Fight 2
        await new Fight().startFight()
        await this.checkDeadCharacters()

        // Chest Room 2
        await this.chestRoom()
        await this.checkDeadCharacters()

        // Boss Fight
        await new Fight(this.randomBoss()).startFight()
        await this.checkDeadCharacters()

        // End
        Screen.screen.displayScreen("Fight Over, you won the Game!")

    }
    
    /**
     * calls on Screen to display character options and get user input 3 times to generate a 3 character team
     * 
     * @returns the player's team of 3 characters
     */
    async createTeam() : Promise<Character[]> {
        const playerTeam : Character[] = []
        const options = [Barbarian, Mage, Paladin, Priest, Thief, Warrior]
        for (let i=1; i <= 3; i++) {
            const answer = await Screen.screen.displaySelection(i)
            playerTeam.push(new options[answer]())
        }
        return playerTeam
    }

    /**
     * Handles the chest room.
     * 
     * calls on Screen to display options
     * randomly chooses an item to give the player if they decide to open it
     * randomly hurts every player if it is a trapped chest
     */
    async chestRoom(){
        const choice = await Screen.screen.displayChestRoom("chest","You have found a room containing a mysterious chest. It can either give you a random item or hurt you. Do you want to open it?  1: Yes  2: No")
        if (choice == 1){
            await Screen.screen.displayChestRoom("opening","You have chosen to open the mysterious chest.")
            await this.timeout(2000)
            const trapProbability : number = Math.floor(Math.random() * 100)
            if (trapProbability < 30) {
                for (let i=0; i<this.players.length; i++) {
                    const dammage : number = Math.floor(Math.random() * 100)/2
                    this.players[i].currentHp -= (this.players[i].maxHp*dammage - this.players[i].defense)
                    if (this.players[i].currentHp < 0) {
                        this.players[i].currentHp = 0
                    }
                }
                await Screen.screen.displayChestRoom("bad","You have fallen for a trapped chest! All of your players have taken a random amount of damage!")
                await this.timeout(2000)
            } else {
                let stealObject : string | null
                const stealNumber : number = Math.floor(Math.random() * 100)
                if (stealNumber<5){
                    stealObject = "halfStar"
                    Inventory.inventory.nHalfStars+=1
                } else if(5<=stealNumber && stealNumber<20) {
                    stealObject = "starFragment"
                    Inventory.inventory.nStarFragments+=1
                } else if (60<=stealNumber && stealNumber<90){
                    stealObject = "potion"
                    Inventory.inventory.nPotions+=1
                } else if (90<=stealNumber){
                    stealObject = "ether"
                    Inventory.inventory.nEthers+=1
                } else {
                    stealObject = "nothing"
                }
            }
        }        
    }

    checkDeadCharacters() {
        for (let i=0;i<this.players.length;i++){
            if (this.players[i].currentHp <= 0){
                this.deadPlayers.push(this.players[i])
                deadCharacters.push(this.players[i])
                this.players.splice(i,1)
            }
        }
        if (deadCharacters.length != 0) {
            await Screen.screen.displayChestRoom("bad",`${deadCharacters.join(", ")} have been killed by the trapped chest. RIP!`)
            await this.timeout(2000)
        }
    }

    /**
     * Generates a random monster from the monster classes
     * Makes every statistics better
     * @returns a list of a single monster
     */
    randomBoss() : Monster[]{
        const monsterList = [Augmentor, Ogre, Golem, Vampire, Zombie]
        const boss = new monsterList[Math.floor(Math.random() * 5)]()
        boss.attack = boss.attack*1.5
        boss.defense = boss.defense*1.5
        boss.speed = boss.speed*2
        boss.maxHp = boss.maxHp*2
        boss.currentHp = boss.maxHp
        return [boss]
    }

    /**
     * Used to display screen longer in order to have time to read
     * 
     * @param ms : delai in miliseconds
     * @returns a promise lasting that amount of time
     */
    public timeout (ms : number) {
        return new Promise(res => setTimeout(res,ms));
    }
}

