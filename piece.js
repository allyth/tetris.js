// @ts-check
class Piece {
    constructor(options) {
    }

    setPieceType(pieceType) {
        switch (pieceType) {
            case "SQUARE":
                this.squaresInfo = [
                    [true, true],
                    [true, true]
                ];
                break;
            case "LINE":
                this.squaresInfo = [
                    [true, true, true, true]
                ];
                break;
            case "L_SHAPE":
                this.squaresInfo = [
                    [true],
                    [true],
                    [true, true]
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
}


