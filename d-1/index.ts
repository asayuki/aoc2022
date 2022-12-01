/**
 * Get calories from string by splitting empty lines and combining
 * all numbers that belong to each other whilst also sort it from
 * highest to lowest
 * 
 * @param calories {String}
 * @returns {Array}
 */
function get_calories(calories: string): Array<number> {
    return calories.split(/\n\n/).map(elf => elf.split(/\n/).reduce((a: number, b: string) => +a + +b, 0)).sort((a, b) => b - a);
}

const sumCalories = get_calories(await Bun.file('resources/d-1/calories.txt').text());

console.log(`
    1: ${sumCalories[0]}
    2: ${sumCalories.slice(0, 3).reduce((a: number, b: number) => a + b, 0)}
`);

/**
 * LOL Shortway
 */
//console.log((await Bun.file('calories.txt').text()).split(/\n\n/).map(s => s.split(/\n/).reduce((a, b) => +a + +b, 0)).sort((a, b) => b - a).slice(0, 3).reduce((a, b, _, d) => ({ one: d[0], topThree: b + a.topThree }), { one: 0, topThree: 0 }));

export {};