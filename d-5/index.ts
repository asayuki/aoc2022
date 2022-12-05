const rearrangements = await Bun.file('resources/d-5/rearrangements.txt').text();

// TODO: Maybe parse from textfile aswell??1!11!?
const crates = [
    ['B', 'W', 'N'],
    ['L', 'Z', 'S', 'P', 'T', 'D', 'M', 'B'],
    ['Q', 'H', 'Z', 'W', 'R'],
    ['W', 'D', 'V', 'J', 'Z', 'R'],
    ['S', 'H', 'M', 'B'],
    ['L', 'G', 'N', 'J', 'H', 'V', 'P', 'B'],
    ['J', 'Q', 'Z', 'F', 'H', 'D', 'L', 'S'],
    ['W', 'S', 'F', 'J', 'G', 'Q', 'B'],
    ['Z', 'W', 'M', 'S', 'C', 'D', 'J'],
];

const solution1 = JSON.parse(JSON.stringify(crates.slice()));
const solution2 = JSON.parse(JSON.stringify(crates.slice()));

rearrangements.split(/\n/).forEach((move) => {
    const newMove = move.split(' ').filter((m, i) => [1, 3, 5].includes(i) ? m : null).map(Number).map((n, i) => [1, 2].includes(i) ? n - 1 : n);
    const moving = solution1[newMove[1]].splice(solution1[newMove[1]].length - newMove[0], solution1[newMove[1]].length);
    solution1[newMove[2]] = [...solution1[newMove[2]], ...moving.reverse()];

    const moving2 = solution2[newMove[1]].splice(solution2[newMove[1]].length - newMove[0], solution2[newMove[1]].length);
    solution2[newMove[2]] = [...solution2[newMove[2]], ...moving2];
});


let output1 = '';
let output2 = '';

solution1.forEach((s) => output1 += s.pop());
solution2.forEach((s) => output2 += s.pop());

console.log(`
    1: ${output1}
    2: ${output2}
`);

export {};