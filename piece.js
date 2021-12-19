 // @ts-check
class Piece {
    constructor(options) {
        this.tetris = /** @type {Tetris} */ (options.tetris);
        this.canvas = /** @type {HTMLCanvasElement} */ (options.canvas);
        this.canvasCtx = this.canvas.getContext("2d");
        this.cellWidth = options.cellWidth;
        this.cellHeight = options.cellHeight;
        this.left = options.left;
        this.top = options.top;
        this.color = options.color || '#FED9B7';
        this.pieceType = options.pieceType;
        this.rotation = options.rotation || 0;
        this.rotationOffset = [ 
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        this.setPieceType(this.pieceType);
    }

    draw() {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasCtx.fillStyle = this.color;
        const squaresInfo = this.rotationInfo[this.rotation];
        for (let rowIndex = 0; rowIndex < squaresInfo.length; rowIndex++) {
            const currentRow = squaresInfo[rowIndex];
            for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
                if (currentRow[colIndex]) {
                    this.canvasCtx.fillRect(
                        this.cellWidth * (this.left + colIndex),
                        this.cellHeight * (this.top + rowIndex),
                        this.cellWidth,
                        this.cellHeight);
                }
            }
        }
    }

    getHeight() {
        const squareInfo = this.rotationInfo[this.rotation];
        return squareInfo.length;
    }

    getSquaresInfo() {
        return this.rotationInfo[this.rotation];
    }

    getWidth() {
        const squareInfo = this.rotationInfo[this.rotation];
        return squareInfo[0].length;
    }

    reachedBottom() {
        const squaresInfo = this.rotationInfo[this.rotation];
        for (let rowIndex = 0; rowIndex < squaresInfo.length; rowIndex++) {
            const currentRow = squaresInfo[rowIndex];
            for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
                if (currentRow[colIndex]) {
                    const squareTop = this.top + rowIndex;
                    const squareIsOnLastRow = squareTop >= this.tetris.rows - 1;
                    if (squareIsOnLastRow) {
                        return true;
                    }
                    const squareHasSomethingUnderneath = !squareIsOnLastRow && this.tetris.board[this.top + rowIndex + 1][this.left + colIndex];
                    const squareIsDead = squareIsOnLastRow || squareHasSomethingUnderneath;
                    const squareReachedBottom = this.top + rowIndex >= this.tetris.rows;
                    if (squareIsDead || squareReachedBottom) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    moveDown() {
        if (this.reachedBottom() === false) {
            this.top = this.top + 1;
            this.draw();
        }
    }

    moveLeft() {
        if (this.left <= 0) {
            return;
        }

        const squaresInfo = this.rotationInfo[this.rotation];
        for (let rowIndex = 0; rowIndex < squaresInfo.length; rowIndex++) {
            const currentRow = squaresInfo[rowIndex];
            for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
                const pieceCellExists = squaresInfo[rowIndex][colIndex];
                const boardCellExists = this.tetris.board[rowIndex + this.top][colIndex + this.left - 1];
                if (pieceCellExists && boardCellExists) {
                    return;
                }
            }
        }

        this.left = this.left - 1;
        this.draw();
    }

    moveRight() {
        if (this.left >= this.tetris.cols - this.getWidth()) {
            return;
        }

        const squaresInfo = this.rotationInfo[this.rotation];
        for (let rowIndex = 0; rowIndex < squaresInfo.length; rowIndex++) {
            const currentRow = squaresInfo[rowIndex];
            for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
                const pieceCellExists = squaresInfo[rowIndex][colIndex];
                const boardCellExists = this.tetris.board[rowIndex + this.top][colIndex + this.left + 1];
                if (pieceCellExists && boardCellExists) {
                    return;
                }
            }
        }

        this.left = this.left + 1;
        this.draw();

    }

    rotate() {
        // Cycle through the 4 rotation indices (0 to 3)
        this.rotation = (this.rotation + 1) % 4;

        this.left += this.rotationOffset[this.rotation][0];
        this.top += this.rotationOffset[this.rotation][1];

        const pieceWidth = this.getWidth();

        // Check if piece exceeds right bound
        if ((pieceWidth + this.left) > this.tetris.cols) {
            this.left = this.tetris.cols - pieceWidth;
        }
        // Check if piece exceeds left bound
        if (this.left < 0) {
            this.left = 0;
        }

        this.draw();
    }

    setPieceType(pieceType) {
        switch (pieceType) {
            case "SQUARE":
                this.rotationInfo = [
                    [
                        [true, true],
                        [true, true]
                    ],
                    [
                        [true, true],
                        [true, true]
                    ],
                    [
                        [true, true],
                        [true, true]
                    ],
                    [
                        [true, true],
                        [true, true]
                    ]
                ];
                break;
            case "LINE":
                this.rotationOffset = [ 
                    [-1, 1],
                    [1, -1],
                    [-1, 1],
                    [1, -1]
                ];
                this.rotationInfo = [
                    [
                        [true, true, true, true]
                    ],
                    [
                        [true],
                        [true],
                        [true],
                        [true]
                    ],
                    [
                        [true, true, true, true],
                    ],
                    [
                        [true],
                        [true],
                        [true],
                        [true]
                    ]
                ];
                break;
            case "L_SHAPE":
                this.rotationInfo = [
                    [
                        [true, false],
                        [true, false],
                        [true, true]
                    ],
                    [
                        [true, true, true],
                        [true, false, false],
                    ],
                    [
                        [true, true],
                        [false, true],
                        [false, true]
                    ],
                    [
                        [false, false, true],
                        [true, true, true]
                    ]

                ];
                break;
            case "T_SHAPE":
                this.rotationInfo = [
                    [
                        [true, true, true],
                        [false, true, false]
                    ],                    
                    [
                        [false, true],
                        [true, true],
                        [false, true]
                    ],                    
                    [
                        [false, true, false],
                        [true, true, true]
                    ],                    
                    [
                        [true, false],
                        [true, true],
                        [true, false]
                    ]                    
                ];
                break;
            case "Z_SHAPE":
                this.rotationInfo = [
                    [
                        [true, true, false],
                        [false, true, true],
                    ],
                    [
                        [false, true],
                        [true, true],
                        [true, false]
                    ],
                    [
                        [true, true, false],
                        [false, true, true],
                    ],
                    [
                        [false, true],
                        [true, true],
                        [true, false]
                    ]
                ];
                break;
            default:
                throw new Error("Invalid piece type: " + pieceType);
        }
    }

}


