const trees = await Bun.file('resources/d-8/trees.txt').text();

function createTreeGrid(trees: string): Array<Array<number>> {
    const grid = [];
    trees.split(/\n/).forEach(c => grid.push(c.split('').map(Number)));
    return grid;
}

function isVisible(grid: Array<Array<number>>, y: number, x: number): boolean {
    const row = grid[y];
    const column = grid.map((c) => c[x]);

    if (Math.max(...row.slice(0, x)) < grid[y][x] || Math.max(...row.slice().reverse().slice(0, (row.length - 1) - x)) < grid[y][x] || Math.max(...column.slice(0, y)) < grid[y][x] || Math.max(...column.slice().reverse().slice(0, (column.length - 1) - y)) < grid[y][x]) {
        return true;
    }
}

function findNumVisibleTrees(grid: Array<Array<number>>): number {
    let visible = 0;

    for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
            visible += isVisible(grid, y, x) ? 1 : 0;
        }
    }

    return visible;
}

function treeIsVisible(trees: Array<number>, height: number, fromHeight: number): Array<number> {
    const highest = trees.length === -1 ? 0 : Math.max(...trees);

    if (trees.length === 0) {
        return [...trees, height];
    }

    if (highest >= fromHeight) {
        return trees;
    }

    return [...trees, height];
}

function treeScore(grid: Array<Array<number>>, y: number, x: number): number {
    const scores = [0, 0, 0, 0];

    const row = grid[y];
    const sumY = grid.map((c) => c[x]);

    scores[0] = sumY.slice().reverse().slice(sumY.length - y).reduce((ns, n) => treeIsVisible(ns, n, grid[y][x]), []).length;
    scores[1] = row.slice(0, x).reverse().reduce((ns, n) => treeIsVisible(ns, n, grid[y][x]), []).length;
    scores[2] = sumY.slice(y + 1).reduce((ns, n) => treeIsVisible(ns, n, grid[y][x]), []).length;
    scores[3] = row.slice(x + 1).reduce((ns, n) => treeIsVisible(ns, n, grid[y][x]), []).length;
    return scores[0] * scores[1] * scores[2] * scores[3];
}

function getHighestTreeScore(grid: Array<Array<number>>): number {
    const scores = [];
    for (let y = 0; y < grid.length; y += 1) {
        for (let x = 0; x < grid[y].length; x += 1) {
                scores.push(treeScore(grid, y, x))
        }
    }
    return Math.max(...scores);
}

const sum1 = findNumVisibleTrees(createTreeGrid(trees));
const sum2 = getHighestTreeScore(createTreeGrid(trees));

console.log(`
    1: ${sum1}
    2: ${sum2}
`);

export {};