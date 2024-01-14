export default class Object {
    constructor(x=0, y=0, fill='#ff0000', strokeWidth = 2, strokeColor='#000000') {
        this.x = x;
        this.y=y;
        this.fill = fill;
        this.strokeWidth = strokeWidth;
        this.strokeColor = strokeColor;
    }

    adjustPosition(xMovement, yMovement) {
        this.x += xMovement;
        this.y += yMovement;
    }
}