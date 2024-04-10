export default class Menu {

    message: string;
    options: string[];

    constructor(message: string, options: string[]){
        this.message = message
        this.options = options
    }

    input() : number {
        //console.log(`
        //╔═════════════════════════════════════════════════════════════════════════════════╗
        //║   1. Attaquer   ║   2. Attaque Spéciale   ║   3. Inventaire   ║   4. Quitter    ║
        //╚═════════════════════════════════════════════════════════════════════════════════╝`)

        /**
         * 
         *  ──▄────▄▄▄▄▄▄▄────▄───
            ─▀▀▄─▄█████████▄─▄▀▀──
            ─────██─▀███▀─██──────
            ───▄─▀████▀████▀─▄────
            ─▀█────██▀█▀██────█▀──

      (\__/)
      (•ㅅ•)      Don’t talk to
   ＿ノヽ ノ＼＿      me or my son
 /　`/ ⌒Ｙ⌒ Ｙ`ヽ     ever again.
( 　(三ヽ人　 /　 |
|　ﾉ⌒＼ ￣￣ヽ  ノ
ヽ＿＿＿＞､＿_／
   ｜( 王 ﾉ〈   
   /ﾐ`ー ― 彡\  
  /  ╰    ╯   \ 

 /\__/\
( •ㅅ• )
/      \

 /\__/\
( •ㅅ• )
 >    <

 /\__/\
| •  • |
 \_ㅅ_/

|\---/|
| • • |
 \_ㅅ_/

  ,-.       _,---._ __  / \
 /  )    .-'       `./ /   \
(  (   ,'            `/    /|
 \  `-"             \'\   / |
  `.              ,  \ \ /  |
   /`.          ,'-`----Y   |
  (    (       ;        |   /
  |  ,-.    ,-'         |  /
  |  | (   |            | /
  )  |  \  `.___________|/
  `--'   `--'

                      /^--^\     /^--^\     /^--^\
                      \____/     \____/     \____/
                     /      \   /      \   /      \
                    |        | |        | |        |
                     \__  __/   \__  __/   \__  __/
|^|^|^|^|^|^|^|^|^|^|^|^\ \^|^|^|^/ /^|^|^|^|^\ \^|^|^|^|^|^|^|^|^|^|^|^|
| | | | | | | | | | | | |\ \| | |/ /| | | | | | \ \ | | | | | | | | | | |
| | | | | | | | | | | | / / | | |\ \| | | | | |/ /| | | | | | | | | | | |
| | | | | | | | | | | | \/| | | | \/| | | | | |\/ | | | | | | | | | | | |
#########################################################################
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |


           ___
          (___)
   ____
 _\___ \  |\_/|
\     \ \/ , , \ ___
 \__   \ \ ="= //|||\
  |===  \/____)_)||||
  \______|    | |||||
      _/_|  | | =====
     (_/  \_)_)
  _________________
 (                _)
  (__             )
    (___    _____)
        '--'


        ✨ Star fragment 🧪 Potion  🌟 Half star 🔮 Ether
         */

        console.log(this.message);
        console.log(this.options);

        const promptValue = prompt("Que voulez-vous faire ?");
        const input = Number(promptValue);

        if(isNaN(input)) {
            console.log("Choix invalide !");
            return this.input();
        } else if (Number.isInteger(input) && input > 0) {
            if(input <= this.options.length) {
                return input-1
            } else {
                console.log("Choix invalide !");
                return this.input();                
            } 
        } else {
            console.log("Choix invalide !");
            return this.input();              
        }
    }
}
