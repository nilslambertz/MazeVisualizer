export const createMaze = (height, width, perfectMaze) => {
    let maze = [];
    for(let i = 0; i < height; i++) {
        maze[i] = [];
        for(let j = 0; j < width; j++) {
            maze[i][j] = 1;
        }
    }

    primsAlgorithm(maze);

    if(!perfectMaze) {
        let minRand = 20;
        let maxRand = 120;
        let rand = Math.floor(Math.random() * (maxRand - minRand + 1) + minRand);
        for(let n = 0; n < rand; n++) {
            let i = Math.floor(Math.random() * height);
            let j = Math.floor(Math.random() * width);

            if(maze[i][j] === 0) continue;

            let neighbours = getPathNeighbours(maze, i, j);
            if(neighbours.length !== 2) continue;

            let x = neighbours[0].x - neighbours[1].x;
            let y = neighbours[0].y - neighbours[1].y;

            if(y === 0) {
                maze[i][j] = 0;
            } else if(x === 0) {
                maze[i][j] = 0;
            }
        }
    }

    let startX = Math.floor(Math.random() * maze.length);
    let startY = Math.floor(Math.random() * maze[0].length);
    while(maze[startX][startY] !== 0) {
        startX = Math.floor(Math.random() * maze.length);
        startY = Math.floor(Math.random() * maze[0].length);
    }
    maze[startX][startY] = 2;

    let endX = Math.floor(Math.random() * maze.length);
    let endY = Math.floor(Math.random() * maze[0].length);
    while(maze[endX][endY] !== 0 || (startX === endX && startY === endY)) {
        endX = Math.floor(Math.random() * maze.length);
        endY = Math.floor(Math.random() * maze[0].length);
    }
    maze[endX][endY] = 3;

    return {
        maze: maze,
        start: [startX, startY],
        end: [endX, endY]
    };
}

function primsAlgorithm(maze) {
    let walls = new Set();
    let firstX = Math.floor(Math.random() * maze.length);
    if(firstX % 2 === 1) firstX--;
    let firstY = Math.floor(Math.random() * maze[0].length);
    if(firstY % 2 === 1) firstY--;
    addWalls(firstX,firstY, walls, maze);
    maze[firstX][firstY] = 0;
    while(walls.size > 0) {
        let random = getRandomItem(walls);
        let x = parseInt(random.substring(0, random.indexOf(",")));
        let y = parseInt(random.substring(random.indexOf(",") + 1));
        let neighbours = getNeighbours(x, y, maze);
        let randomNeighbour = neighbours.splice(Math.floor(Math.random() * neighbours.length), 1)[0];
        createPath(x, y, randomNeighbour[0], randomNeighbour[1], maze);
        maze[x][y] = 0;
        walls.delete(random);
        addWalls(x, y, walls,maze);
    }
}

function createPath(x1, y1, x2, y2, maze) {
    if(x1 === x2) {
        if(y1 < y2) {
            maze[x1][y1+1] = 0;
        } else {
            maze[x1][y1-1] = 0;
        }
    } else {
        if(x1 < x2) {
            maze[x1+1][y1] = 0;
        } else {
            maze[x1-1][y1] = 0;
        }
    }
}

function getNeighbours(x,y, maze) {
    let neighbours = [];
    if(x-2 >= 0 && maze[x-2][y] === 0) {
        neighbours.push([x-2, y]);
    }
    if(x+2 < maze.length && maze[x+2][y] === 0) {
        neighbours.push([x+2, y]);
    }
    if(y-2 >= 0 && maze[x][y-2] === 0) {
        neighbours.push([x, y-2]);
    }
    if(y+2 < maze[0].length && maze[x][y+2] === 0) {
        neighbours.push([x, y+2]);
    }
    return neighbours;
}

function addWalls(x,y, walls, maze) {
    if(x-2 >= 0 && maze[x-2][y] !== 0) {
        walls.add((x-2) + "," + y);
    }
    if(x+2 < maze.length && maze[x+2][y] !== 0) {
        walls.add((x+2) + "," + y);
    }
    if(y-2 >= 0 && maze[x][y-2] !== 0) {
        walls.add(x + "," + (y-2));
    }
    if(y+2 < maze[0].length && maze[x][y+2] !== 0) {
        walls.add(x + "," + (y+2));
    }
}

function getRandomItem(set) {
    let items = Array.from(set);
    return items[Math.floor(Math.random() * items.length)];
}

export const getPathNeighbours = (maze, x, y) => {
    let n = [];

    if(x > 0 && maze[x-1][y] !== 1) {
        n.push({
            x: x-1,
            y: y
        });
    }
    if(x < maze.length-1 && maze[x+1][y] !== 1) {
        n.push({
            x: x+1,
            y: y
        });
    }
    if(y > 0 && maze[x][y-1] !== 1) {
        n.push({
            x: x,
            y: y-1
        });
    }
    if(y < maze[0].length-1 && maze[x][y+1] !== 1) {
        n.push({
            x: x,
            y: y+1
        });
    }
    return n;
}