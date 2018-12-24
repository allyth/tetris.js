// @ts-check

const boardWidth = 10;
const boardHeight = 20;
const board = [[]];

board[0][9] = null;

const boardCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById('board'));
const boardCtx = boardCanvas.getContext('2d');

boardCtx.fillStyle = 'green';
boardCtx.fillRect(10, 10, 150, 100);