import Character from "./Characters/Character.ts"
import Augmentor from "./Characters/Monsters/Augmentor.ts"
import Ogre from "./Characters/Monsters/Ogre.ts"
import Golem from "./Characters/Monsters/Golem.ts"
import Vampire from "./Characters/Monsters/Vampire.ts"
import Zombie from "./Characters/Monsters/Zombie.ts"
import GameManagement from "./GameManager.ts"
import Mage from "./Characters/Players/Mage.ts"
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
        let message = "Game has Started"
        while (this.players.length > 0 || this.monsters.length > 0) {
            Screen.screen.displayScreen(message, this.allCharacters, this.order)
            Screen.screen.displayScreen(`it's ${this.order[0].className}'s turn`, this.allCharacters, this.order)
            message = await this.order[0].playTurn(this.players, this.monsters)
            if (this.order[0].currentHp == 0) {
                this.checkDeadCharacters()
                this.order.splice(0,1)
            } else {
                for (let i =0;i<this.order.length;i++){
                    if (i==0){
                        this.order[i].speedPosition=0
                    } else {
                        this.order[i].speedPosition += (this.order[i].speed)
                    }
                }
                this.order=this.getOrder(this.order)
            }
        }
        console.log("fight over")
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

    checkDeadCharacters() {
            for (let i=0;i<this.players.length;i++){
                if (this.players[i].currentHp <= 0){
                    this.deadPlayers.push(this.players[i])
                    this.players.splice(i,1)
                }
            }
            for (let i=0;i<this.monsters.length;i++){
                if (this.monsters[i].currentHp <= 0){
                    //this.deadMonsters.push(this.players[i])
                    this.monsters.splice(i,1)
                }
            }
    }

    printStats(character : Character) {
        console.log(
            `Character Stats : ${character.className} \n
            ---------------------------------\n
            Attack : ${character.attack}\n
            Defence : ${character.defense}\n
            Speed : ${character.speed}\n
            Max HP : ${character.maxHp}\n
            Current HP : ${character.currentHp}\n`)
        if (character instanceof Mage){
            console.log(`
            Max Mana : ${character.manaMax}\n
            Current Mana : ${character.manaNow}\n`)
        } else if (character instanceof Augmentor) {
            console.log(`
            Orbs : ${character.orbe.length}\n`)
        }
    }
}