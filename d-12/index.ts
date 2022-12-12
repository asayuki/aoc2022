const terrainMap = await Bun.file('resources/d-12/terrain.txt').text();

function heuristic(position0, position1) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);
  
    return d1 + d2;
}

class Tile {
    x: number;
    y: number;
    v: number = 0;
    f: number = 0;
    g: number = 0;
    h: number = 0;
    neighbors: Array<Tile>;
    parent: any;

    constructor(x, y, v) {
        this.x = x;
        this.y = y;
        this.v = v;
        this.neighbors = [];
    }

    updateNeighbors(grid, rows, cols) {
        if (this.x < cols) {
            this.neighbors.push(grid[this.y][this.x + 1]);
        }
        if (this.x > 0) {
            this.neighbors.push(grid[this.y][this.x - 1]);
        }
        if (this.y < rows) {
            this.neighbors.push(grid[this.y + 1][this.x]);
        }
        if (this.y > 0) {
            this.neighbors.push(grid[this.y - 1][this.x]);
        }
    }
}

function createMap(terrain: string, forceY: number = null, forceX: number = null): { startingPoint: Tile, endPoint: Tile } {
    const grid = [];
    let startingPoint = null;
    let endPoint = null;
    terrain.split(/\n/).forEach((r, ri) => {
        const row = [];
        r.split('').forEach((c, ci) => {
            if (c === 'S' && forceX === null && forceY === null) {
                startingPoint = new Tile(ci,ri, 1);
                row.push(startingPoint);
            } else if (c === 'E') {
                endPoint = new Tile(ci,ri, 27);
                row.push(endPoint);
            } else {
                if (ri === forceY && ci === forceX) {
                    startingPoint = new Tile(ci,ri, 1);
                    row.push(startingPoint);
                } else {
                    row.push(new Tile(ci,ri, c === 'S' ? 1 : c.charCodeAt(0) - 96));
                }
            }
        });
        grid.push(row);
    });

    const rows = grid.length - 1;
    const cols = grid[0].length - 1;

    grid.forEach((r) => {
        r.forEach((c) => {
            c.updateNeighbors(grid, rows, cols);
        });
    });

    return {
        startingPoint,
        endPoint,
    };
}

function findPath(terrain, forceY: number = null, forceX: number = null) {
    const { startingPoint, endPoint } = createMap(terrain, forceY, forceX);

    let openSet = [];
    let closedSet = [];
    
    let start = startingPoint;
    let end = endPoint;
    let path = [];

    openSet.push(start);

    while (openSet.length > 0) {
        let lowestIndex = 0;
        for (let i = 0; i < openSet.length; i++) {
          if (openSet[i].f < openSet[lowestIndex].f) {
            lowestIndex = i;
          }
        }
        let current = openSet[lowestIndex];
    
        if (current === end) {
          let temp = current;
          path.push(temp);
          while (temp.parent) {
            path.push(temp.parent);
            temp = temp.parent;
          }
          return path.length - 1;
        }
    
        openSet.splice(lowestIndex, 1);
        closedSet.push(current);
    
        let neighbors = current.neighbors;
    
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
      
            if (!closedSet.includes(neighbor)) {
              let possibleG = neighbor.v > current.v + 1 ? Infinity : current.g + 1;
      
              if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
              } else if (possibleG >= neighbor.g) {
                continue;
              }
      
              neighbor.g = possibleG;
              neighbor.h = heuristic(neighbor, end);
              neighbor.f = neighbor.g + neighbor.h;
              neighbor.parent = current;
            }
        }
    }
    
    return [];
}

const sum1 = findPath(terrainMap);
const sum2 = [];
// Because I know all my 'a's are at the startingline on each row
for (let i = 0; i < 41; i += 1) {
    sum2.push(findPath(terrainMap, i, 0));
}

console.log(`
    1: ${sum1} (should be: 380)
    2: ${Math.min(...sum2)} (shoule be: 375)
`);

export {}