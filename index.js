// @ts-check
const tetris = new Tetris({
    rows: 20,
    cols: 10,
    boardCanvas: document.getElementById('board'),
    pieceCanvas: document.getElementById('piece-canvas')
});

tetris.drawGrid();
tetris.refreshCurrentPiece();
tetris.currentPiece.draw();
