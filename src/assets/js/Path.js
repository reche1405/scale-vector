export default class Path{
    prefixOptions;
    constructor(initX, initY, points=[], fill='none', strokeColor="#000000", strokeWidth="2") {
        this.initX = initX;
        this.initY = initY;
        this.points = points;
        this.pointsString = '';
        this.fill = fill;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
        this.addPoint('M', {x: this.initX, y: this.initY})
    }

    addPoint(prefix='c', position) {
        let newPoint = {prefix: '' , relativePosition: null, physicalPosition: {}, controlPoints:[] };
        newPoint.prefix = prefix;
        if(prefix == prefix.toLowerCase()) {
            newPoint.relativePosition = this.calculteRelativePos(position)
        }
        newPoint.physicalPosition = position;
        let curveOptions = ['c', 'C', 's', 'S', 'q', 'Q' ]
        if(curveOptions.includes(prefix) ) {

            newPoint.controlPoints =  newPoint.prefix == newPoint.prefix.toLowerCase() ? 
            this.calculateDefaultBezier(newPoint.relativePosition, true) : 
            this.calculateDefaultBezier(newPoint.physicalPosition, false);
        }

        this.points.push(newPoint)
        this.pointsString = this.pointsToString();
        console.log('The points string is: ', this.pointsString)
    }
    calculteRelativePos(newPosition) {
        let lastPoint = this.points[this.points.length - 1].physicalPosition
        let relativePos = {
            x:newPosition.x - lastPoint.x,
            y:newPosition.y - lastPoint.y,
        }
        console.log('last point: ', lastPoint, 'relative', relativePos)
        return relativePos;
    }

    calculateDefaultBezier(newPosition, isRelative) {
        let lastPoint = this.points[this.points.length - 1];
        if(isRelative) {
            return[{x:30, y:30}, {x:newPosition.x-30, y:newPosition.y + 30}]
        }
        lastPoint =  lastPoint.physicalPosition;
        let defaultDiff = 10;
        let p1 = {x: lastPoint.x + defaultDiff, y: lastPoint.y + defaultDiff};
        let p2 = {x: newPosition.y - defaultDiff, y: newPosition.y - defaultDiff};
        console.log(p1, p2);
        return [p1, p2];
    }

    pointsToString() {
        let string = '';
        this.points.forEach(point => {
            string += point.prefix ? point.prefix : ''
            if(point.controlPoints.length > 0) {
                for(let i =0; i < point.controlPoints.length; i++) {
                    string += point.controlPoints[i].x + ' ' 
                    +  point.controlPoints[i].y + ' ';
                }
            }
            if(point.relativePosition) {

                string += point.relativePosition.x + ' ' + point.relativePosition.y;
            } else {
                string += point.physicalPosition.x + ' ' + point.physicalPosition.y;

            }
            string +=' ';
        });
        return string;
    }
}

