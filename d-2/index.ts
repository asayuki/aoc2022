const rounds = await Bun.file('resources/d-2/rock-paper-scissors.txt').text();

const rules = {
    'A': { score: 1, defeats: 'C', defeated_by: 'B' },
    'B': { score: 2, defeats: 'A', defeated_by: 'C' },
    'C': { score: 3, defeats: 'B', defeated_by: 'A'},
}
const decode = {
    'X': { shape: 'A', predicted_result: 'lose' },
    'Y': { shape: 'B', predicted_result: 'draw' },
    'Z': { shape: 'C', predicted_result: 'win' },
};

function calculate_round(opponent: string, you: string): number {
    return (you === opponent ? 3 : rules[you].defeats === opponent ? 6 : 0) + rules[you].score;
}

function cheat_round(opponent: string, you: string): number {
    switch (decode[you].predicted_result) {
        case 'lose':
            return calculate_round(opponent, rules[opponent].defeats);
        case 'win':
            return calculate_round(opponent, rules[opponent].defeated_by);
        default:
            return calculate_round(opponent, opponent);
    }
}

let match1 = 0;
let match2 = 0;

rounds.split(/\n/).forEach((round) => {
    const [opponent, you] = round.split(' ');
    match1 += calculate_round(opponent, decode[you].shape);
    match2 += cheat_round(opponent, you);
});

console.log(`
    1: ${match1}
    2: ${match2}
`);

export {};
