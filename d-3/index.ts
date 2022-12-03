const rucksacks = await Bun.file('resources/d-3/rucksacks.txt').text();

function getCharScore(char) {
    const uppercase = char === char.toUpperCase();
    return char.charCodeAt() - (uppercase ? 64 : 96) + (uppercase ? 26 : 0);
}

let sum = 0;
let sum2 = 0;
let elfGroup = [];
let i = 0;

rucksacks.split(/\n/).forEach((rucksack) => {
    // Solution 1
    const c1 = rucksack.slice(0, rucksack.length / 2);
    const c2 = rucksack.slice(rucksack.length / 2);
    const uc = c1.split('').filter(c => c2.split('').indexOf(c) != -1);
    sum += getCharScore(uc[0]);

    // Solution 2
    i += 1;
    elfGroup.push(rucksack);
    if (i % 3 === 0) {
        const uc2 = elfGroup[0].split('').filter(c => elfGroup[1].split('').indexOf(c) != -1 && elfGroup[2].split('').indexOf(c) != -1);
        elfGroup = [];
        i = 0;
        sum2 += getCharScore(uc2[0]);
    }
});

console.log(`
    1: ${sum} 
    2: ${sum2}
`);

export {};