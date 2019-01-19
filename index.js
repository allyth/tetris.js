// @ts-check
const tetris = new Tetris({
    rows: 20,
    cols: 10,
    boardCanvas: document.getElementById('board')
});

tetris.drawGrid();

const piece = new Piece ({
    canvas: document.getElementById('currentPiece'),
    cellWidth: 30,
    cellHeight: 30,
    left: 5,
    top: 5,
    pieceType: "LINE"
});
piece.draw();

const piece1 = new Piece ({
    board: tetris,
    canvas: document.getElementById('currentPiece'),
    cellWidth: 30,
    cellHeight: 30,
    left: 5,
    top: 10,
    pieceType: "L_SHAPE",
    rotation: 0,
    color: "#4618DF"
});
tetris.currentPiece = piece1;
piece1.draw();

// const piece2 = new Piece ({
//     canvas: document.getElementById('currentPiece'),
//     cellWidth: 30,
//     cellHeight: 30,
//     left: 2,
//     top: 7,
//     pieceType: "T_SHAPE",
//     color: "#3F896E"
// });
// piece2.draw();

// const piece3 = new Piece ({
//     canvas: document.getElementById('currentPiece'),
//     cellWidth: 30,
//     cellHeight: 30,
//     left: 2,
//     top: 14,
//     pieceType: "Z_SHAPE"
// });
// piece3.draw();