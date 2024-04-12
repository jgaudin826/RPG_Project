import Character from "./Characters/Character.ts"

export default class Screen {
    private static _screen : Screen | null = null
    playerSprite : Array<Array<string>> = [["       /\\__/\\       ","      ( •ㅅ• )      ","      /      \\      "],["       /\\__/\\       ","      ( XㅅX )      ","      /      \\      "]]
    monsterSprite : Array<Array<string>>  = [["       /\\__/\\       ","      (=•==•=)``    ","       \\_ㅅ_/       "],["       /\\__/\\       ","      (=X==X=)``    ","       \\_ㅅ_/       "]]
    bossSprite : Array<string> = ["      (\\__/)        ","      (•ㅅ•)        ","   ＿ノヽ ノ＼＿    "," /  `/ ⌒ Ｙ⌒ Ｙ`ヽ  ","(   (三ヽ人   /   | ", "|  ﾉ⌒＼ ￣￣ヽ  ノ  ","ヽ＿＿＿＞､＿_／    ","   ｜( 王 ﾉ〈 (\\__/)","   /ﾐ`ー ― 彡\\(•ㅅ•)","  /  ╰    ╯   /    \\"]
    spaceBar = "║                                                                                                                                       ║"
    fightScene : string = ""

    private constructor() {}

    static get screen() {
        if(!this._screen) {
            this._screen = new Screen()
        }
        return this._screen
    }

    //Start Menu
    //Create Player Team (interactif)
    //Chest Room
    //Inventory
    //Options

    createScreen(message: string, allCharacters : Character[], order : Character[], input? : []) {
    
    }
    displayFight(allCharacters : Character[],order : Character[]) {
        console.clear
        console.log("╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗")
        console.log(this.spaceBar)
        console.log(this.getMonsters(allCharacters,order))

        for (let i=0; i<8; i++) {
            console.log(this.spaceBar)
        }

        console.log(this.getPlayers(allCharacters,order))
    }
    displayBoss(allCharacters : Character[],order : Character[]) {
        console.clear
        console.log("╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗")
        console.log(this.spaceBar)
        console.log(this.getBoss(allCharacters,order))
        console.log(this.getPlayers(allCharacters,order))
    }

    getMonsters(allCharacters : Character[],order : Character[]): string{
        let fightScreen = ""

        // Line 1
        let line = `║${this.getSpaces(30)}`
        for (let i=0; i<3;i++) { 
            let tempLine = ""
            if (order.indexOf(allCharacters[i+3])!=-1){
                tempLine +=`${order.indexOf(allCharacters[i+3]) + 1}. ${allCharacters[i+3].name} (${allCharacters[i+3].className})` 
            } else {
                tempLine += `${allCharacters[i+3].name} (Dead)`
            }
            tempLine += this.getSpaces(15-(tempLine.length-20))
            line += tempLine
        }
        fightScreen += line + "║\n"

        //Line 2
        line = `║${this.getSpaces(30)}`
        for (let i=0;i<3;i++){
            let tempLine = ""
            let health = Math.round((allCharacters[i+3].currentHp/allCharacters[i+3].maxHp)*20)
            if (health == 0) {
                tempLine += "\x1b[31m████████████████████\x1b[0m"
            } else if (health == 100){
                tempLine += "\x1b[32m████████████████████\x1b[0m"
            } else {
                tempLine += "\x1b[32m"
                for (let j=0;j<health;j++){
                    tempLine+= "█"
                }
                tempLine +="\x1b[31m"
                for (let j=0;j<(20-health);j++){
                    tempLine+= "█"
                }
                tempLine += "\x1b[0m"
            }
            let healthText = ` ${allCharacters[i+3].currentHp}/${allCharacters[i+3].maxHp}`
            tempLine += healthText + this.getSpaces(15-healthText.length) 
            line += tempLine
        }
        fightScreen += line + "║\n"

        //Line 3-4-5
        for (let i=0;i<3;i++) {
            line = `║${this.getSpaces(30)}`
            for (let j=0;j<3;j++) {
                if(allCharacters[i+3].currentHp<=0){
                    line += this.monsterSprite[1][i]
                } else {
                    line += this.monsterSprite[0][i]
                }
                line += this.getSpaces(15)
            }
            fightScreen += line + "║\n"
        }
        fightScreen += this.spaceBar
        return fightScreen
    }

    getPlayers(allCharacters : Character[],order : Character[]): string {
        let fightScreen = "" 
        // Line 1
        let line = `║${this.getSpaces(10)}`
        for (let i=0; i<3;i++) { 
            let tempLine = ""
            if (order.indexOf(allCharacters[i])!=-1){
                tempLine +=`${order.indexOf(allCharacters[i]) + 1}. ${allCharacters[i].name} (${allCharacters[i].className})` 
            } else {
                tempLine += `${allCharacters[i].name} (Dead)`
            }
            tempLine += this.getSpaces(15-(tempLine.length-20))
            line += tempLine
        }
        fightScreen += line + this.getSpaces(20) + "║\n"

        //Line 2
        line = `║${this.getSpaces(10)}`
        for (let i=0;i<3;i++){
            let tempLine = ""
            let health = Math.round((allCharacters[i].currentHp/allCharacters[i].maxHp)*20)
            if (health == 0) {
                tempLine += "\x1b[31m████████████████████\x1b[0m"
            } else if (health == 100){
                tempLine += "\x1b[32m████████████████████\x1b[0m"
            } else {
                tempLine += "\x1b[32m"
                for (let j=0;j<health;j++){
                    tempLine+= "█"
                }
                tempLine +="\x1b[31m"
                for (let j=0;j<(20-health);j++){
                    tempLine+= "█"
                }
                tempLine += "\x1b[0m"
            }
            let healthText = ` ${allCharacters[i].currentHp}/${allCharacters[i].maxHp}`
            tempLine += healthText + this.getSpaces(15-healthText.length) 
            line += tempLine
        }
        fightScreen += line + this.getSpaces(20) + "║\n"

        //Line 3-4-5
        for (let i=0;i<3;i++) {
            line = `║${this.getSpaces(10)}`
            for (let j=0;j<3;j++) {
                if(allCharacters[i].currentHp<=0){
                    line += this.playerSprite[1][i]
                } else {
                    line += this.playerSprite[0][i]
                }
                line += this.getSpaces(15)
            }
            fightScreen += line + this.getSpaces(20) + "║\n"
        }
        fightScreen += this.spaceBar + "\n"
        fightScreen += "╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣"
        this.fightScene = fightScreen
        return fightScreen
    }
    getBoss(allCharacters : Character[],order : Character[]): string {
        let fightScreen = ""

        //Line 1
        let line = `║${this.getSpaces(95)}`
        let tempLine = `${order.indexOf(allCharacters[3]) + 1}. Jean-Pierre (${allCharacters[3].className})`
        line += tempLine
        line += this.getSpaces(20-(tempLine.length-20))
        fightScreen += line + "║\n"

        //Line 2
        line = `║${this.getSpaces(95)}`
        tempLine = ""
        let health = Math.round((allCharacters[3].currentHp/allCharacters[3].maxHp)*20)
        if (health == 0) {
            tempLine += "\x1b[31m████████████████████\x1b[0m"
        } else if (health == 100){
            tempLine += "\x1b[32m████████████████████\x1b[0m"
        } else {
            tempLine += "\x1b[32m"
            for (let j=0;j<health;j++){
                tempLine+= "█"
            }
            tempLine +="\x1b[31m"
            for (let j=0;j<(20-health);j++){
                tempLine+= "█"
            }
            tempLine += "\x1b[0m"
        }
        let healthText = ` ${allCharacters[3].currentHp}/${allCharacters[3].maxHp}`
        tempLine += healthText + this.getSpaces(20-healthText.length) 
        line += tempLine
        fightScreen += line + "║\n"

        // boss
        for (let i=0;i<10;i++) {
            line = `║${this.getSpaces(95)}` 
            line += this.bossSprite[i]
            fightScreen += line + this.getSpaces(20) + "║\n"
        }
        fightScreen += this.spaceBar
        return fightScreen
    }

    getSpaces(nSpaces : number): string{
        let spaces = ""
        for(let i=0; i<nSpaces;i++){
            spaces+= " "
        }
        return spaces
    }

    printMessage(message : string) {
        let line = "║     Game : "
        while (message.length>0) {
            if (message.length>110) {
                line += message.slice(0,110) + "             ║"
            }
            console.log(line)
            line = "║            "
        }
    }
    inventory() {

    }
}   
