// @ts-check
class Tetris {
    constructor(options) {
        this.cols = options.cols;
        this.rows = options.rows;
        this.boardCanvas = /** @type {HTMLCanvasElement} */ (options.boardCanvas);
        this.boardCtx = this.boardCanvas.getContext("2d");
        this.board = [[]];
        this.cellWidth = this.boardCanvas.width / this.cols;
        this.cellHeight = this.boardCanvas.height / this.rows;
        this.currentPiece = null;
    }

    drawGrid() {
        for (let i = 1; i <= this.cols - 1; i++) {
            this.boardCtx.beginPath();
            this.boardCtx.moveTo(this.cellWidth * i, 0);
            this.boardCtx.lineTo(this.cellWidth * i, this.boardCanvas.height);
            this.boardCtx.stroke();
        }

        for (let i = 1; i <= this.rows - 1; i++) {
            this.boardCtx.beginPath();
            this.boardCtx.moveTo(0, this.cellHeight * i);
            this.boardCtx.lineTo(this.boardCanvas.height, this.cellHeight * i);
            this.boardCtx.stroke();
        }
    }

    startGame() {
        setInterval(this.tick, 2000);
    }

    tick() {
        if (!this.currentPiece) {
            this.currentPiece = new Piece({
                canvas: document.getElementById('currentPiece'),
                cellWidth: 30,
                cellHeight: 30,
                left: Math.round(this.cols / 2) - this.cols,
                top: 5,
                pieceType: "LINE"
            });
                
        }

    }

}


