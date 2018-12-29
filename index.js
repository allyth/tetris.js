// @ts-check
const tetris = new Tetris({
    rows: 20,
    cols: 10,
    boardCanvas: document.getElementById('board')
});
tetris.drawGrid();
