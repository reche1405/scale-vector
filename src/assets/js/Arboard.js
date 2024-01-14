export default class Artobard {

    constructor(width, height, posX, posY) {
        this.width = width;
        this. height = height;
        this.posX = posX;
        this.posY = posY;
    }

    drawArtBoardAtCentre(ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.posX - (this.width / 2), this.posY - (this.height / 2), this.width, this.height);
    }
}