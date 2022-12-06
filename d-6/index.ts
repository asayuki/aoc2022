const datastreamBuffer = await Bun.file('resources/d-6/datastream-buffer.txt').text();

function findStartOfMarker(buffer: string, distinctCharacters: number = 4) {
    let position = 0;
    while (position < buffer.length)  {
        if (new Set(buffer.slice(position, position + distinctCharacters)).size === buffer.slice(position, position + distinctCharacters).length) {
            return position + distinctCharacters;
        }
        
        position += 1;
    }
}

const solution1 = findStartOfMarker(datastreamBuffer);
const solution2 = findStartOfMarker(datastreamBuffer, 14);

console.log(`
    1: ${solution1}
    2: ${solution2}
`);

export {};