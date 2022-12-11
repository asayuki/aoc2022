import { prod, evaluate } from 'mathjs'

const monkeysInput = await Bun.file('resources/d-11/monkeys.txt').text();

class Monkey {
    items: Array<number>;
    inspected: number;
    operation: string;
    test: number;
    monkeyTrue: number;
    monkeyFalse: number;

    constructor(about: string) {
        const [, items, operation, test, monkeyTrue, monkeyFalse] = about.split(/\n/);
        this.items = [...items.matchAll(/\d+/g)].map((num) => +num);
        this.inspected = 0;
        this.operation = operation.split(': ')[1].split('= ')[1];
        this.test = +test.match(/\d+/g).pop();
        this.monkeyTrue = +monkeyTrue.match(/\d+/g).pop();
        this.monkeyFalse = +monkeyFalse.match(/\d+/g).pop();
    }

    inspectItems(monkeys: Array<Monkey>, stressedOut: boolean): void {
        const itemsToInspect = this.items.length;
        for (let i = 0; i < itemsToInspect; i+= 1) {
            const item = this.items.shift();
            let relief = 0;
            if (stressedOut) {
                relief = Math.floor(evaluate(this.operation.replaceAll('old', `${item}`)) % prod(monkeys.map((monkey) => monkey.test)));
            } else {
                relief = Math.floor(evaluate(this.operation.replaceAll('old', `${item}`)) / 3);
            }
            this.inspected += 1;
            monkeys[relief % this.test === 0 ? this.monkeyTrue : this.monkeyFalse].items.push(relief);
        }
    }
}

function monkeyBusiness(monkeysSheet: Array<string>, rounds: number, stressedOut: boolean = false): number {
    const monkeys = [];
    monkeysSheet.forEach((monkey) => {
        monkeys.push(new Monkey(monkey));
    });

    for (let i = 0; i < rounds; i += 1) {
        monkeys.forEach(monkey => monkey.inspectItems(monkeys, stressedOut));
    }

    const [top1, top2] = monkeys.sort((a, b) => b.inspected - a.inspected);
    return top1.inspected * top2.inspected;
}

const sum1 = monkeyBusiness(monkeysInput.split(/\n\n/), 20)
const sum2 = monkeyBusiness(monkeysInput.split(/\n\n/), 10000, true);

console.log(`
    1: ${sum1}
    2: ${sum2};
`);

export {}