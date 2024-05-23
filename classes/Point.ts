class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = 0;
        this.y = 0;
        this.set(x, y);
    }

    set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
    copy(p : Point) {
        this.x = p.x;
        this.y = p.y;
    }
}
export default Point;