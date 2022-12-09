const movements = await Bun.file('resources/d-9/movements.txt').text();

class Knot {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    move(direction: String) {
        switch (direction) {
            case 'R':
                this.x += 1;
                break;
            case 'U':
                this.y += 1;
                break;
            case 'L':
                this.x -= 1;
                break;
            case 'D':
                this.y -= 1;
                break;
            default:
                break;
        }
    }

    follow(follow: Knot) {
        const x = follow.x - this.x;
        const y = follow.y - this.y;

        if (Math.abs(x) <= 1 && Math.abs(y) <= 1) {
            return;
        }

        this.x += Math.abs(x) > 0 ? x / Math.abs(x) : 0;
        this.y += Math.abs(y) > 0 ? y / Math.abs(y) : 0;
    }
}

function countTailPositions(knotLength: number = 2) {
    const visited = ['0.0'];
    const knots = [];

    for (let k = 0; k < knotLength; k += 1) {
        knots.push(new Knot());
    }

    movements.split(/\n/).forEach((movement) => {
        const [direction, steps] = movement.split(' ');
        for (let s = 0; s < parseInt(steps, 10); s += 1) {
            knots[0].move(direction);

            for (let i = 1; i < knots.length; i += 1) {
                knots[i].follow(knots[i - 1]);
            }

            if (!visited.includes(`${knots[knots.length - 1].x}.${knots[knots.length - 1].y}`)) {
                visited.push(`${knots[knots.length - 1].x}.${knots[knots.length - 1].y}`);
            }
        }
    });
    
    return visited.length;
}

const sum1 = countTailPositions();
const sum2 = countTailPositions(10);

console.log(`
    1: ${sum1}
    2: ${sum2}
`);

export default {};