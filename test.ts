import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts";

for await (const keypress of readKeypress()) {
    console.log(keypress)

    switch (keypress.key) {
        case "1": {
            console.log("hello")
        }
    }

    if (keypress.ctrlKey && keypress.key === 'c') {
        Deno.exit(0);
    }
}