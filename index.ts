import * as fs from 'fs';
import { spawnSync } from 'bun';

console.log("         v");
console.log("        >X<");
console.log("         A");
console.log("        d$b");
console.log("      .d\$$b.");
console.log("    .d$i$$\$$b.             _    ___ __   __ ___  _  _  _____    ___   ___    ___  ___   ___   ___   ___  __  ___  ___ ");
console.log("       d$$@b              /_\\  |   \\\\ \\ / /| __|| \\| ||_   _|  / _ \\ | __|  / __|/ _ \\ |   \\ | __| |_  )/  \\|_  )|_  )");
console.log("      d\$$$ib             / _ \\ | |) |\\ V / | _| | .` |  | |   | (_) || _|  | (__| (_) || |) || _|   / /| () |/ /  / / ");
console.log("    .d$$$\$$$b           /_/ \\_\\|___/  \\_/  |___||_|\\_|  |_|    \\___/ |_|    \\___|\\___/ |___/ |___| /___|\\__//___|/___|");
console.log("  .d$$@$$$$\$$ib.");
console.log("      d$$i$$b");
console.log("     d\$$$$@$b");
console.log("  .d$@$$\$$$$$@b.");
console.log(".d$$$$i$$$\$$$$$$b.");
console.log("        ###");
console.log("        ###");
console.log("        ### mh");
console.log("\n\n");

const dirs = fs.readdirSync('.').filter((dir: string) => dir.includes('d-'));

// @ts-ignore
const [, , , day] = Bun.argv;
const parsedDay = parseInt(day, 10);

if (typeof day !== 'undefined' && (Number.isNaN(parsedDay) || parsedDay < 1 || parsedDay > 25)) {
    console.log('Please select a valid day. A number between 1-25');
    process.exit();
}

if (day && !dirs.includes(`d-${day}`)) {
    console.log('That day does not yet exist.');
    console.log(`Maybe you should try and solve it (if problem exists) at: https://adventofcode.com/2022/day/${day}`);
    process.exit();
}

dirs.sort().map((dir: string) => {
    if (typeof day !== 'undefined' && dir !== `d-${day}`) {
        return;
    }

    const { stdout: title } = spawnSync(['cat', `./${dir}/title.txt`]);
    const { stdout: output } = spawnSync(['bun', 'run', `./${dir}/index.ts`]);
    console.log(`${title.toString()}\n${output.toString()}`);
});