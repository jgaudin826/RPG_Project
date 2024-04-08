import Character from "./Characters/Character";

export default class Fight {
    players : Character[]
    monsters : Character[]
    order : Character[]
    deadPlayers : Character[]

    constructor(players : Character[], monsters : Character[]) {
        this.players = players
        this.monsters = monsters || this.createMonsters()
        this.order = this.getOrder()
        this.deadPlayers = []
    }

    startFight() : Character[] {
        console.log("here is the list of monsters")
        for (let monster of this.monsters) {
            console.log(`${monster.name} : ${monster.className}`)
        }
        console.log("Fight has started!")
        while (this.players.length > 0 || this.monsters.length > 0) {
            console.log(`it's ${this.order[0].name} turn as a ${this.order[0].className}`)
            this.order[0].playTurn(this.players, this.monsters)
            if (this.order[0].currentHp == 0) {
                this.deadPlayers.push(this.order[0])
            } else {
                this.order.push(this.order[0])
            }
            this.order.shift()
            this.checkDeadCharacters()
        }
        return this.players, this.deadPlayers
    }

    getOrder() : Character[] {
        let orderList : Character[] = []
        let i = 0;
        let j = 0;
        while (i < this.players.length && j < this.monsters.length) {  
            if (this.players[i].speed < this.monsters[j].speed) {
                orderList.push(this.players[i])
                i++;
            } else {
                orderList.push(this.monsters[j])
                j++;
            }
        }
        while (i < this.players.length) {
            orderList.push(this.players[i])
            i++;
        }
        while (j < this.monsters.length) {
            orderList.push(this.monsters[j])
            j++
        }
        return orderList
    }

    createMonsters() : Character[] {
        return []
    }

    checkDeadCharacters() {
        for (let i = 0; i < this.order.length; i++) {
            if (this.order[i].currentHp == 0){
                this.deadPlayers.push(this.order[i])
                this.order.splice(i, 1)
            }
        }
    }
}
