import Object from "./Object";
export default class Circle extends Object {
    constructor(x=0, y=0, radius=100, fill="#ff0000", strokeColor="#000000", strokeWidth="2") {
        super(x,y,fill, strokeWidth, strokeColor )
        this.radius = radius;
    }
    adjustSize(xMovement, yMovement) {
        this.radius += (xMovement + yMovement);
    }

    static createCircle(mouse, totalPaths) {
        let newCircle = {
            type: 'circle' ,
            selected:true,
            object: new this(mouse.x,mouse.y, 1),
            id: 'circle' + totalPaths + 1
        }
        return newCircle;
    }
}