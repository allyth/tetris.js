// @ts-check
class Tetris {
    constructor(options) {
        this.cols = options.cols;
        this.rows = options.rows;
        this.canvas = /** @type {HTMLCanvasElement} */ (options.boardCanvas);
        this.canvasCtx = this.canvas.getContext("2d");
        this.pieceCanvas = /** @type {HTMLCanvasElement} */ (options.pieceCanvas);
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
        this.canvasCtx.lineWidth = 1;

        for (let i = 0; i <= this.cols; i++) {
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(this.cellWidth * i, 0);
            this.canvasCtx.lineTo(this.cellWidth * i, this.canvas.height);
            this.canvasCtx.stroke();
        }

        for (let i = 0; i <= this.rows; i++) {
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(0, this.cellHeight * i);
            this.canvasCtx.lineTo(this.canvas.height, this.cellHeight * i);
            this.canvasCtx.stroke();
        }
    }

    drawSquares() {
        this.canvasCtx.fillStyle = "#F07167";
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
        const pieceTypes = ['SQUARE', 'LINE', 'L_SHAPE', 'Z_SHAPE', 'T_SHAPE'];
        const randIndex =  Math.floor(Math.random() * (pieceTypes.length));
        const canvasElement = /** @type {HTMLCanvasElement} */ (document.getElementById('piece-canvas'));
        this.currentPiece = new Piece({
            tetris: this,
            canvas: canvasElement,
            cellWidth: canvasElement.width / this.cols,
            cellHeight: canvasElement.height / this.rows,
            left: 5,
            top: 0,
            pieceType: pieceTypes[randIndex],
            rotation: 0,
            color: "#FED9B7"
        });
    }

    removeCompletedRows() {
        const completedRows = [];
        for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
            const currentRow = this.board[rowIndex];
            let currentRowIsComplete = currentRow.length && true;
            for (let colIndex = 0; colIndex < this.cols; colIndex++) {
                if (!currentRow[colIndex]) {
                    currentRowIsComplete = false;
                    break;
                }
            }
            if (currentRowIsComplete) {
                completedRows.push(rowIndex);
            }
        }
        const self = this;
        completedRows.forEach(function(rowIndex){
            self.board.splice(rowIndex, 1);
            self.board.unshift([]);
        });
    }

    startGame() {
        setInterval(this.tick, 2000);
    }

    tick() {
        this.currentPiece.moveDown();
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
            this.removeCompletedRows();
            this.refreshCurrentPiece();
            this.clearCanvas();
            this.drawGrid();
            this.drawSquares();
        }

    }

}


