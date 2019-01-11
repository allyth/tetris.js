// @ts-check
class Piece {
    constructor(options) {
        this.canvas = /** @type {HTMLCanvasElement} */ (options.canvas);
        this.canvasCtx = this.canvas.getContext("2d");
        this.cellWidth = options.cellWidth;
        this.cellHeight = options.cellHeight;
        this.left = options.left;
        this.top = options.top;
        this.color = options.color || '#89cff0';
        this.pieceType = options.pieceType;
        this.rotation = options.rotation || 0;
        this.setPieceType(this.pieceType);
    }

    getWidth() {
        const squareInfo = this.rotationInfo[this.rotation];
        const pieceWidth = Math.max.apply(null, squareInfo.map(function (row) {
            return row.length;
        }));;
        return pieceWidth;
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
                this.rotationInfo = [
                    [
                        [false, false, false, false],
                        [false, false, false, false],
                        [true, true, true, true],
                        [false, false, false, false]
                    ],
                    [
                        [false, true, false, false],
                        [false, true, false, false],
                        [false, true, false, false],
                        [false, true, false, false]
                    ],
                    [
                        [false, false, false, false],
                        [false, false, false, false],
                        [true, true, true, true],
                        [false, false, false, false]
                    ],
                    [
                        [false, true, false, false],
                        [false, true, false, false],
                        [false, true, false, false],
                        [false, true, false, false]
                    ]
                ];
                break;
            case "L_SHAPE":
                this.rotationInfo = [
                    [
                        [true, false, false],
                        [true, false, false],
                        [true, true, false]
                    ],
                    [
                        [true, true, true],
                        [false, false, true],
                        [false, false, false]
                    ],
                    [
                        [true, true, false],
                        [false, true, false],
                        [false, true, false]
                    ],
                    [
                        [true, false, false],
                        [true, true, true],
                        [false, false, false]
                    ]

                ];
                break;
            case "T_SHAPE":
                this.squaresInfo = [
                    [true, true, true],
                    [false, true, false]
                ];
                break;
            case "Z_SHAPE":
                this.squaresInfo = [
                    [true, true],
                    [false, true, true],
                ];
                break;
            default:
                throw new Error("Invalid piece type: " + pieceType);
        }
    }

    draw() {
        this.canvasCtx.fillStyle = this.color;
        const squaresInfo = this.rotationInfo[0];
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
}


