// @ts-check
const boardCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById('board'));
const boardCtx = boardCanvas.getContext('2d');

const boardColumns = 10;
const boardRows = 20;
const board = [[]];
const columnWidth = boardCanvas.width / boardColumns;
const columnHeight = boardCanvas.height / boardRows;
board[0][9] = null;


for (let i = 1; i <= boardColumns - 1; i++) {
    boardCtx.beginPath();
    boardCtx.moveTo(columnWidth * i, 0);
    boardCtx.lineTo(columnWidth * i, boardCanvas.height);
    boardCtx.stroke();
}

for (let i = 1; i <= boardRows - 1; i++) {
    boardCtx.beginPath();
    boardCtx.moveTo(0, columnHeight * i);
    boardCtx.lineTo(boardCanvas.height, columnHeight * i);
    boardCtx.stroke();
}
