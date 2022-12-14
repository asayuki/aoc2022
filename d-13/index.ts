const distressSignal = await Bun.file('resources/d-13/distress-signal.txt').text();

function compare(p1, p2) {
    if (!p1) {
        return -1;
    } else if (!p2) {
        return 1;
    } else if (Array.isArray(p1) && Array.isArray(p2)) {
        for (let i = 0; i < Math.max(p1.length, p2.length); i += 1) {
            const c = compare(p1[i], p2[i]);
            if (c !== 0) {
                return c;
            }
        }
    } else if (Number.isInteger(p1) && Number.isInteger(p2)) {
        if (p1 < p2) {
            return -1;
        } else if (p2 < p1) {
            return 1;
        }
    } else if (Array.isArray(p1) && !Array.isArray(p2)) {
        return compare(p1, [p2]);
    } else if (!Array.isArray(p1) && Array.isArray(p2)) {
        return compare([p1], p2);
    }

    return 0;
}

function getCorrectPairs(packets) {
    const correctOrder = [];
    packets.forEach((packet, i) => {
        const [p1, p2] = packet.split(/\n/);
        if (compare(JSON.parse(p1), JSON.parse(p2)) < 0) {
            correctOrder.push(i + 1);
        }
    });

    return correctOrder.reduce((a, b) => a === 0 ? b : a + b, 0);
}

function sortedPackets(packets) {
    let unsorted = [];
    packets.forEach((packet, i) => {
        const [p1, p2] = packet.split(/\n/);
        unsorted.push(JSON.parse(p1), JSON.parse(p2));
    });
    const d = [[[2]], [[6]]]
    return [...unsorted, ...d].sort((a, b) => compare(a, b)).reduce((s, v, i) => d.includes(v) ? s === 0 ? i + 1 : s * (i + 1) : s , 0);
}

const sum1 = getCorrectPairs(distressSignal.split(/\n\n/));
const sum2 = sortedPackets(distressSignal.split(/\n\n/));

console.log(`
    1: ${sum1}
    2: ${sum2}
`);

export {}