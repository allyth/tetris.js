// @ts-check
const tetris = new Tetris({
    rows: 20,
    cols: 10,
    boardCanvas: document.getElementById('board'),
    pieceCanvas: document.getElementById('piece-canvas')
});

tetris.drawGrid();
let randomValue = Math.random();

const piece1 = new Piece ({
    tetris: tetris,
    canvas: document.getElementById('piece-canvas'),
    cellWidth: 30,
    cellHeight: 30,
    left: 5,
    top: 17,
    pieceType: "L_SHAPE",
    rotation: 0,
    color: "#4618DF"
});

const piece2 = new Piece ({
    tetris: tetris,
    canvas: document.getElementById('piece-canvas'),
    cellWidth: 30,
    cellHeight: 30,
    left: 5,
    top: 17,
    pieceType: "SQUARE",
    rotation: 0,
    color: "#4618DF"
});

const piece3 = new Piece ({
    tetris: tetris,
    canvas: document.getElementById('piece-canvas'),
    cellWidth: 30,
    cellHeight: 30,
    left: 5,
    top: 17,
    pieceType: "T_SHAPE",
    rotation: 0,
    color: "#4618DF"
});

const piece4 = new Piece ({
    tetris: tetris,
    canvas: document.getElementById('piece-canvas'),
    cellWidth: 30,
    cellHeight: 30,
    left: 5,
    top: 17,
    pieceType: "LINE",
    rotation: 0,
    color: "#4618DF"
});

    if(randomValue <= .2){
        tetris.currentPiece = piece1;
    }
    else if(randomValue <= .4 && randomValue > .2 ){
        tetris.currentPiece = piece2;
    }
    else if(randomValue <= .6 && randomValue > .4){
        tetris.currentPiece = piece3;
    } else{
        tetris.currentPiece = piece4;
    }

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

//const piece4 = new Piece ({
   // tetris: tetris,
  //  canvas:document.getElementById('piece-canvas'),
  //  cellWidth: 30,
   // cellHeight: 30,
    //left:5,
   // top: 17,
   // pieceType: "SQUARE",
   // rotation: 0,
   // color: "#4658DF"

//});