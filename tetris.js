// @ts-check
class Tetris {
    constructor(options) {
        this.cols = options.cols;
        this.rows = options.rows;
        this.boardCanvas = /** @type {HTMLCanvasElement} */ (options.boardCanvas);
        this.boardCtx = this.boardCanvas.getContext("2d");
        this.board = [];
        for (let i = 0; i < this.rows; i++) {
            this.board.push([]);
        }
        this.cellWidth = this.boardCanvas.width / this.cols;
        this.cellHeight = this.boardCanvas.height / this.rows;
        this.currentPiece = null;

        this.bindEvents();
        setInterval(this.tick.bind(this), 1000);
    }

    bindEvents() {
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;

            if (keyName === 'ArrowUp') {
                this.currentPiece.rotate();
            } else if (keyName === 'ArrowLeft') {
                this.currentPiece.moveLeft();
            } else if (keyName === 'ArrowRight') {
                this.currentPiece.moveRight();
            } else if (keyName === 'ArrowDown') {
                this.currentPiece.moveDown();
            };

        }, false);
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
        // Initialize the current piece
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

        // Check if the current piece reached bottom
        if (this.currentPiece && this.currentPiece.reachedBottom()) {
            for (let x = 0; x < this.currentPiece.getSquaresInfo().length; x++) {
                for (let y = 0; y < this.currentPiece.getSquaresInfo().length; y++) {
                    if (this.currentPiece.getSquaresInfo()[x][y]) {
                        this.board[this.currentPiece.left + x][this.currentPiece.top + y] = true;
                    }
                }
            }
            this.currentPiece = null;
        }

    }

}


