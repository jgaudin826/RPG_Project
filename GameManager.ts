import Character from "./Characters/Character.ts"
import Warrior from "./Characters/Players/Warrior.ts"
import Mage from "./Characters/Players/Mage.ts"
import Paladin from "./Characters/Players/Paladin.ts"
import Barbarian from "./Characters/Players/Barbarian.ts"
import Priest from "./Characters/Players/Priest.ts"
import Thief from "./Characters/Players/Thief.ts"
import Fight from "./Fight.ts"
import Zombie from "./Characters/Monsters/Zombie.ts"
import Menu from "./Menu.ts"
import Screen from "./Screen.ts";
import Inventory from "./Inventory.ts"

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
     */
    async start(){
        this.players= await this.createTeam()
        this.players, this.deadPlayers = await new Fight().startFight()
        this.chestRoom()
        this.players, this.deadPlayers = await new Fight().startFight()
        this.chestRoom()
        const boss = [new Zombie()]
        this.players, this.deadPlayers = await new Fight(boss).startFight()

    }
    
    /**
     * 
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

    chestRoom(){
        const menu = new Menu("Do you want to open the mysterious chest?", ["Open Chest", "Skip Room", "Quit"])
        const choice = menu.input()
        if (choice == 1){
            const trapProbability : number = Math.floor(Math.random() * 100)
            if (trapProbability < 30) {
                for (let i=0; i<this.players.length; i++) {
                    const dammage : number = Math.floor(Math.random() * 100)/2
                    this.players[i].currentHp -= (this.players[i].maxHp*dammage - this.players[i].defense)
                    if (this.players[i].currentHp < 0) {
                        this.players[i].currentHp = 0
                    }
                }
                this.checkDeadCharacters()
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
                Screen.screen.printMessage(`You've obtain ${stealObject}`)
            }
        }        
    }

    checkDeadCharacters() {
        for (let i=0;i<this.players.length;i++){
            if (this.players[i].currentHp <= 0){
                this.deadPlayers.push(this.players[i])
                this.players.splice(i,1)
            }
        }
    }
}

