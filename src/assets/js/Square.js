import Object from './Object';

export default class Square extends Object {

    constructor(x=0, y=0, width=100, height=100, xRounding =0, yRounding =0,
    fill='#ff0000', strokeWidth = 2, strokeColor='#000000' ) {
        super(x, y, fill, strokeWidth, strokeColor)
        this.width=width;
        this.height=height;
        this.xRounding = xRounding;
        this.yRounding = yRounding;
        this.invertX = false;
        this.invertY = false;
    }

    adjustWidth(xMovement) {
        this.width += xMovement;
    }
    adjustWidthInverted(xMovement) {
        this.x += xMovement;
        this.width += Math.abs(xMovement);
    }

    adjustSize(xMovement, yMovement) {
        if( this.width + xMovement > -1 && !this.invertX) {
            this.width += xMovement;
        } else {
            this.invertX = true;
            this.x += xMovement;
            if(xMovement < 0) {

                this.width += Math.abs(xMovement);
            } else {
                if(this.width - xMovement < 0) {
                    this.invertX = false;
                    return;
                }
                this.width -= xMovement;
            }
        } 

        if(this.height + yMovement > -1 && !this.invertY) {

            this.height += yMovement; 
        } else {
            this.invertY = true;
            this.y += yMovement;
            if (yMovement < 0) {
                
             this.height += Math.abs(yMovement);
            } else {
                if(this.height - yMovement < 0) {
                    this.invertY = false;
                    return;
                }
                this.height -= yMovement;
            }
        }

    }

    static createSquare(mouse, totalPaths) {
        let newSquare = {
            type: 'square' ,
            selected:true,
            object: new this(mouse.x,mouse.y, 1, 1),
            id: 'square' + totalPaths + 1
        }
        return newSquare;
    }

}