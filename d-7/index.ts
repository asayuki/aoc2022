const inputHistory = await Bun.file('resources/d-7/history.txt').text();

class TreeNode {
    name: string;
    type: string;
    size: number;
    parent: TreeNode;
    children: Array<TreeNode>;

    constructor(name, type, size, parent = null) {
        this.name = name;
        this.type = type;
        this.size = size;
        this.parent = parent;
        this.children = [];
    }

    addTreeNode(treeNode: TreeNode) {
        this.children.push(treeNode);
        if (treeNode.type === 'file') {
            let parent = treeNode.parent;
            while (parent) {
                parent.size += treeNode.size;
                parent = parent.parent || null;
            }
        }

        return treeNode;
    }
}

function buildTree(input: string): TreeNode {
    let currentDir = new TreeNode('/', 'dir', 0);;
    let tree = currentDir;
    input.split(/\n/).forEach((l) => {
        if (l.includes('dir ') || l === '$ ls' || l === '$ cd /') {
            // Well hello there...
            // General Kenobi!
        } else if (l === '$ cd ..') {
            currentDir = currentDir.parent;
        } else if (l.includes('$ cd')) {
            const [, , dir] = l.split(' ');
            const newDir = currentDir.addTreeNode(new TreeNode(dir, 'dir', 0, currentDir));
            currentDir = newDir;
        } else {
            const [size, file] = l.split(' ');
            currentDir.addTreeNode(new TreeNode(file, 'file', parseInt(size, 10), currentDir));
        }
    });

    return tree;
}

function calculateLowDirectorySizes(tree: TreeNode, totalSize: number = 0): number {
    tree.children.forEach((c) => {
        if (c.type === 'dir' && c.size <= 100000) {
            totalSize += c.size;
        }
        if (c.type === 'dir') {
            totalSize += calculateLowDirectorySizes(c);
        }
    }); 

    return totalSize;
}

function calculateDeleteDirectorySize(tree: TreeNode): number {
    const freeSpace = 70000000 - tree.size;
    const needSpace = 30000000 - freeSpace;
    const deletable = [];

    function roam(trees: TreeNode) {
        trees.children.forEach((c) => {
            if (c.type === 'dir' && c.size >= needSpace) {
                deletable.push(c.size);
            }
            if (c.type === 'dir') {
                roam(c);
            }
        }); 
    }

    roam(tree);
    
    return deletable.sort((a, b) => a - b)[0];
}


let sum1 = calculateLowDirectorySizes(buildTree(inputHistory), 0);
let sum2 = calculateDeleteDirectorySize(buildTree(inputHistory));

console.log(`
    1: ${sum1}
    2: ${sum2}
`);

export {};