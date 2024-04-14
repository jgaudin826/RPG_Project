import Character from "./Characters/Character.ts"
import Augmentor from "./Characters/Monsters/Augmentor.ts"
import Ogre from "./Characters/Monsters/Ogre.ts"
import Golem from "./Characters/Monsters/Golem.ts"
import Vampire from "./Characters/Monsters/Vampire.ts"
import Zombie from "./Characters/Monsters/Zombie.ts"
import GameManagement from "./GameManager.ts"
import Screen from "./Screen.ts"
import Monster from "./Characters/Monster.ts"

export default class Fight {
    players : Character[]
    monsters : Character[]
    order : Character[]
    allCharacters : Character[]
    deadPlayers : Character[]
    deadMonsters : Character[]

    constructor( boss? : Character[],) {
        this.players = GameManagement.game.players
        this.monsters = boss || this.createMonsters()
        this.order = this.getOrder(this.players.concat(this.monsters))
        this.deadPlayers = GameManagement.game.deadPlayers
        this.deadMonsters = []
        this.allCharacters = this.players.concat(this.deadPlayers.concat(this.monsters.concat(this.deadMonsters)))
    }

    async startFight() : Promise<Character[]> {
        Screen.screen.fight = this
        let message = `Fight has Started`
        while (this.players.length > 0 && this.monsters.length > 0) {
            Screen.screen.displayScreen(message, this.allCharacters, this.order)
            await this.timeout(2000)
            Screen.screen.displayScreen(`it's ${this.order[0].className}'s turn`, this.allCharacters, this.order)
            await this.timeout(2000)
            message = await this.order[0].playTurn(this.players, this.monsters)
            for (let i = 0;i<this.order.length;i++){
                if (i==0) {
                    this.order[i].speedPosition = 0
                } else {
                    this.order[i].speedPosition += (this.order[i].speed)
                }
            }
            this.order=this.getOrder(this.order)
            await this.checkDeadCharacters()
            await this.checkResurected()
        }
        if (this.players.length == 0) {
            Screen.screen.displayScreen("Fight Over, you lost to the monsters.")
            Deno.exit(0)
        } else {
            Screen.screen.displayScreen("Fight Over, you won this round.")
            await this.timeout(2000)
        }
        return this.players, this.deadPlayers
    }

    getOrder(orderList : Character[]) : Character[] {
        orderList.sort((a, b) => b.speedPosition - a.speedPosition)
        return orderList
    }

    createMonsters() : Monster[] {
        const monsters : Monster[] = []
        const monsterList = [Augmentor, Ogre, Golem, Vampire, Zombie]
        for (let i=1; i <= 3; i++) {
            monsters.push(new monsterList[Math.floor(Math.random() * 5)]())
        }
        return monsters
    }

    async checkDeadCharacters() {
        const deadCharacters = []
            for (let i=0;i<this.players.length;i++){
                if (this.players[i].currentHp <= 0){
                    this.deadPlayers.push(this.players[i])
                    this.players.splice(i,1)
                }
            }
            for (let i=0;i<this.monsters.length;i++){
                if (this.monsters[i].currentHp <= 0){
                    this.deadMonsters.push(this.monsters[i])
                    this.monsters.splice(i,1)
                }
            }
            for (let i=0;i<this.order.length;i++){
                if (this.order[i].currentHp <= 0){
                    deadCharacters.push(this.order[i])
                    this.order.splice(i,1)
                }
            }
            if (deadCharacters.length != 0) {
                Screen.screen.displayScreen(`${deadCharacters.map((v) => `${v.name} (${v.className.slice(0,3)})`).join(", ")} have been killed.`)
                await this.timeout(2000)
            }
    }

    async checkResurected() {
        for (let i=0;i<this.deadPlayers.length;i++){
            if (this.deadPlayers[i].currentHp > 0){
                this.players.push(this.deadPlayers[i])
                this.deadPlayers.splice(i,1)
                Screen.screen.displayScreen(`${this.players[i]} have been resurected.`)
                await this.timeout(2000)
            }
        }
    }

    public timeout (ms : number) {
        return new Promise(res => setTimeout(res,ms));
    }
}