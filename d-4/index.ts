const assignments = await Bun.file('resources/d-4/assignments.txt').text();

let overlapping = 0;
let overlapping2 = 0;

assignments.split(/\n/).forEach((pairs) => {
    const [a1, a2] = pairs.split(',');
    const [a11, a12] = a1.split('-').map(Number);
    const [a21, a22] = a2.split('-').map(Number);

    // Solution 1
    if ((a11 >= a21 && a12 <= a22) || (a21 >= a11 && a22 <= a12)) {
        overlapping += 1;
    }

    // Solution 2
    if ((a11 >= a21 && a11 <= a22) || (a12 >= a21 && a12 <= a22) || (a21 >= a11 && a21 <= a12) || (a22 >= a11 && a22 <= a12)) {
        overlapping2 += 1;
    }
});

console.log(`
    1: ${overlapping}
    2: ${overlapping2}
`);

export {};