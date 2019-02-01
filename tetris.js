// @ts-check
class Tetris {
    constructor(options) {
        this.cols = options.cols;
        this.rows = options.rows;
        this.canvas = /** @type {HTMLCanvasElement} */ (options.boardCanvas);
        this.canvasCtx = this.canvas.getContext("2d");
        this.board = [];
        for (let i = 0; i < this.rows; i++) {
            this.board.push([]);
        }
        this.cellWidth = this.canvas.width / this.cols;
        this.cellHeight = this.canvas.height / this.rows;
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

    clearCanvas() {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawGrid() {
        for (let i = 1; i <= this.cols - 1; i++) {
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(this.cellWidth * i, 0);
            this.canvasCtx.lineTo(this.cellWidth * i, this.canvas.height);
            this.canvasCtx.stroke();
        }

        for (let i = 1; i <= this.rows - 1; i++) {
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(0, this.cellHeight * i);
            this.canvasCtx.lineTo(this.canvas.height, this.cellHeight * i);
            this.canvasCtx.stroke();
        }
    }
    
    drawSquares() {
        this.canvasCtx.fillStyle = 'blue';
        for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
            const currentRow = this.board[rowIndex];
            for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
                if (currentRow[colIndex]) {
                    this.canvasCtx.fillRect(
                        this.cellWidth * colIndex,
                        this.cellHeight * rowIndex,
                        this.cellWidth,
                        this.cellHeight);
                }
            }
        }
    }

    refreshCurrentPiece() {
        this.currentPiece = new Piece ({
            board: tetris,
            canvas: document.getElementById('currentPiece'),
            cellWidth: 30,
            cellHeight: 30,
            left: 5,
            top: 0,
            pieceType: "L_SHAPE",
            rotation: 0,
            color: "#4618DF"
        });
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
            const squaresInfo = this.currentPiece.getSquaresInfo();
            for (let y = 0; y < squaresInfo.length; y++) {
                const currentRow = squaresInfo[y];
                for (let x = 0; x < currentRow.length; x++) {
                    if (squaresInfo[y][x]) {
                        this.board[this.currentPiece.top + y][this.currentPiece.left + x] = true;
                    }
                }
            }
            this.refreshCurrentPiece();
            this.clearCanvas();
            this.drawGrid();
            this.drawSquares();
        }

    }

}


