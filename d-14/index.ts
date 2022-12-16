const rockformation = await Bun.file('resources/d-14/rockformation.txt').text();

enum CaveType {
    Sand = 'o',
    Rock = '#',
    Origin = '.',
  }

function sandComeToRest({cave, minX, inf}) {
    while (true) {
        let sand = [500 - minX, 0];
        while (true) {
            // if (typeof cave[sand[1]] === 'undefined' || typeof cave[sand[1]][sand[0]] === 'undefined' || cave[0][500 - minX] === CaveType.Sand) {
                if (cave[0][500 - minX] === CaveType.Sand) {
                /*for (let i = 0; i < cave.length; i += 1) {
                    console.log(cave[i].join(''));
                }*/
                return cave.reduce((t, r) => t + r.reduce((rt, c) => c === CaveType.Sand ? rt + 1 : rt, 0), 0);
            }

            if (cave[sand[1]][sand[0]] === CaveType.Origin) {
                sand[1] += 1;
                continue;
            }

            if ([CaveType.Sand, CaveType.Rock].includes(cave[sand[1]][sand[0]])) {
                if (![CaveType.Sand, CaveType.Rock].includes(cave[sand[1]][sand[0] - 1])) {
                    sand[0] -= 1;
                    continue;
                }

                if (![CaveType.Sand, CaveType.Rock].includes(cave[sand[1]][sand[0] + 1])) {
                    sand[0] += 1;
                    continue;
                }
                if (sand[1] -1 === -1) {
                    /*for (let i = 0; i < cave.length; i += 1) {
                        console.log(cave[i].join(''));
                    }*/
                    return cave.reduce((t, r) => t + r.reduce((rt, c) => c === CaveType.Sand ? rt + 1 : rt, 0), 0);
                }
                cave[sand[1] - 1][sand[0]] = CaveType.Sand;
                break;
            }
        }
    }
}

function mapCave(map: String, endlessFloor = false) {
    let minX = null;
    let maxX = null;
    let maxY = null;

    const points = [];

    map.split(/\n/).forEach((line) => {
        line.split(' -> ').forEach((point) => {
            const [x, y] = point.split(',');
            points.push([+x, +y]);
            minX = minX === null ? +x : Math.min(minX, +x);
            maxX = maxX === null ? +x : Math.max(maxX, +x);
            maxY = maxY === null ? +y : Math.max(maxY, +y);
        });
        points.push('D');
    });

    const cave = Array.from({length: maxY + 1}, () => Array.from({ length: maxX - minX + 1}, () => CaveType.Origin));

    for (let i = 0; i < points.length; i += 1) {
        if (points[i] === 'D' || points[i + 1] === 'D') {
            continue;
        }

        const [fx, fy] = points[i];
        const [tx, ty] = points[i + 1];

        if (fy !== ty) {
            if (fy > ty) {
                for (let i = fy; i >= ty; i -= 1) {
                    cave[i][fx - minX] = CaveType.Rock;
                }
            } else {
                for (let i = fy; i <= ty; i += 1) {
                    cave[i][fx - minX] = CaveType.Rock;
                }
            }
        }

        if (fx !== tx) {
            if (fx > tx) {
                for (let i = fx - minX; i >= tx - minX; i -= 1) {
                    cave[fy][i] = CaveType.Rock;
                }
            } else {
                for (let i = fx - minX; i <= tx - minX; i += 1) {
                    cave[fy][i] = CaveType.Rock;
                }
            }
        }
    }

    if (endlessFloor) {
        cave.forEach((r) => {
            r.unshift(...Array.from({ length: 400}, () => CaveType.Origin));
            r.push(...Array.from({ length: 400}, () => CaveType.Origin));
        })
        cave.push(Array.from({ length: maxX - minX + 801}, () => CaveType.Origin));
        cave.push(Array.from({ length: maxX - minX + 801}, () => CaveType.Rock));
    }
    return {
        cave,
        minX: endlessFloor ? minX - 400 : minX,
        inf: endlessFloor,
    };
}

//const sum1 = sandComeToRest(mapCave(rockformation));
//console.log('\n\n');
const sum2 = sandComeToRest(mapCave(rockformation, true));
//console.log(sum1);
console.log(sum2);
// mapCave(rockformation);

export {}