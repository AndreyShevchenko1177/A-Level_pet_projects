const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let current;
let selection = [];

tool.onchange = () => {
    comment.innerText = "";
    if (tool.value === "circle") {
        comment.innerText = "Круг - этот тот же элипс, но +CTRL";
    }
    if (tool.value === "rectangle") {
        comment.innerText = "Квадрат = прямоугольник + CTRL";
    }
};

const tools = {
    graffity: {
        mousemove(e) {
            //e.buttons 0b00000x11 & 0b00000100 == x
            e.buttons & 1 &&
                new Circle(e.layerX, e.layerY, +size.value, color.value);
        },
    },

    // а круг - это частный случай элипса :) - просто зажми клавишу Ctrl
    circle: {
        // mousedown(e) {
        //     current = new Circle(e.layerX, e.layerY, 1, color.value);
        // },
        // mousemove(e) {
        //     if (!current) return;
        //     current.radius = current.distanceTo(e.layerX, e.layerY);
        //     Drawable.drawAll();
        // },
        // mouseup(e) {
        //     current = null;
        // },
    },

    ellipse: {
        mousedown(e) {
            current = new Ellipse(e.layerX, e.layerY, 1, 1, color.value);
        },
        mousemove(e) {
            if (!current) return;
            current.radiusX = current.distanceTo(e.layerX, current.y);
            current.radiusY = current.distanceTo(current.x, e.layerY);
            if (e.ctrlKey) {
                current.radiusX = current.radiusY = Math.max(
                    current.radiusX,
                    current.radiusY
                );
            }
            Drawable.drawAll();
        },
        mouseup(e) {
            current = null;
        },
    },

    line: {
        mousedown(e) {
            current = new Line(
                e.layerX,
                e.layerY,
                0,
                0,
                color.value,
                +size.value
            );
        },
        mousemove(e) {
            if (!current) return;

            current.width = e.layerX - current.x;
            current.height = e.layerY - current.y;

            Drawable.drawAll();
        },
        mouseup(e) {
            current = null;
        },
    },

    //TODO:
    rectangle: {
        mousedown(e) {
            current = new Rectangle(e.layerX, e.layerY, 1, 1, color.value);
        },
        mousemove(e) {
            // console.log(e);
            if (!current) return;
            let deltaX = current.distanceTo(e.layerX, current.y);
            let deltaY = current.distanceTo(current.x, e.layerY);
            current.width = e.layerX > current.x ? deltaX : -deltaX;
            current.height = e.layerY > current.y ? deltaY : -deltaY;
            if (e.ctrlKey) {
                current.width = current.height = Math.max(
                    current.width,
                    current.height
                );
            }
            Drawable.drawAll();
        },
        mouseup(e) {
            current = null;
        },
    },

    select: {
        click(e) {
            // console.log(e);
            let found = Drawable.instances.filter(
                (c) => c.in && c.in(e.layerX, e.layerY)
            );
            if (found.length) {
                if (e.ctrlKey) {
                    selection.push(found.pop());
                } else {
                    selection = [found.pop()];
                }
            } else {
                if (!e.ctrlKey) selection = [];
            }

            Drawable.drawAll(selection);
        },

        mousedown(e) {},

        mousemove(e) {},

        mouseup(e) {
            //x,y, w, h прямоугольника
            //selection - только те элеменеты Drawable.instances которые в границах прямоугольника.
        },
    },
};

// а круг - это частный случай элипса :) - просто зажми клавишу Ctrl
tools.circle = tools.ellipse;

function superHandler(evt) {
    let t = tools[tool.value];
    // console.log(this);
    // надо же еще и проверить вообще наличие такой опции
    if (t && typeof t[evt.type] === "function") t[evt.type].call(this, evt);
}

canvas.onmousemove = superHandler;
canvas.onmouseup = superHandler;
canvas.onmousedown = superHandler;
canvas.onclick = superHandler;

////

function Drawable() {
    Drawable.addInstance(this);
}

const distance = (x1, y1, x2, y2) => ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;

Drawable.prototype.draw = function () {};

Drawable.prototype.distanceTo = function (x, y) {
    if (typeof this.x !== "number" || typeof this.y !== "number") {
        return NaN;
    }
    return distance(this.x, this.y, x, y);
};

Drawable.instances = [];

Drawable.addInstance = function (item) {
    Drawable.instances.push(item);
};

Drawable.drawAll = function (selection = []) {
    ctx.clearRect(0, 0, width, height);
    Drawable.forAll((item) => item.draw());
    selection.forEach((item) => item.draw(true));
};

Drawable.forAll = function (callback) {
    for (var i = 0; i < Drawable.instances.length; i++) {
        callback(Drawable.instances[i]);
    }
};

// class Circle extends Drawable {
//     constructor(x, y, radius, color) {
//         super();
//         this.x = x;
//         this.y = y;
//         this.radius = radius;
//         this.color = color;

//         this.draw();
//     }

//     draw(selected) {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
//         ctx.closePath();
//         ctx.fillStyle = this.color;
//         if (selected) {
//             ctx.lineWidth = 5;
//             ctx.strokeStyle = ~this.color;
//             console.log(~this.color, this.color);
//             ctx.stroke();
//         }
//         ctx.fill();
//     }

//     in(x, y) {
//         return this.distanceTo(x, y) < this.radius;
//     }

//     inBounds(x, y, w, h) {
//         // x = 100, this.x = 102, w = 5
//         return this.x >= x && this.x <= x + w && this.y >= y && this.y <= y + h;
//     }
// }

class Ellipse extends Drawable {
    constructor(x, y, radiusX, radiusY, color) {
        super();
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.color = color;

        this.draw();
    }

    draw(selected) {
        ctx.beginPath();
        ctx.ellipse(
            this.x,
            this.y,
            this.radiusX,
            this.radiusY,
            0,
            0,
            2 * Math.PI
        );
        ctx.closePath();
        ctx.fillStyle = this.color;
        if (selected) {
            ctx.lineWidth = 4;
            // проба чтоб цвет контура отличался от цвета заливки
            // но надо дорабатывать логику
            ctx.strokeStyle =
                "#" +
                (0xffffff - parseInt("0x" + this.color.slice(1))).toString(16);
            console.log(ctx.strokeStyle, this.color);
            ctx.stroke();
        }
        ctx.fill();
    }

    in(x, y) {
        return (
            (x - this.x) ** 2 / this.radiusX ** 2 +
                (y - this.y) ** 2 / this.radiusY ** 2 <
            1
        );
        // (x**2)/a**2 + (y**2)/b**2 = 1 - формула элипса
    }

    //TODO:
    inBounds(x, y, w, h) {
        // return x > this.x - Math.abs(this.x);
    }
}

class Line extends Drawable {
    constructor(x, y, width, height, color, lineWidth) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.lineWidth = lineWidth;

        this.draw();
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }
}

class Rectangle extends Drawable {
    constructor(x, y, width, height, color) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(selected) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.closePath();
        ctx.fillStyle = this.color;
        if (selected) {
            ctx.lineWidth = 4;
            ctx.stroke();
        }
        ctx.fill();
    }

    in(x, y) {
        return (
            this.x <= x &&
            x <= this.x + this.width &&
            this.y <= y &&
            y <= this.y + this.height
        );
    }
}

color.onchange = () => {
    selection.forEach((c) => (c.color = color.value));
    Drawable.drawAll(selection);
};

document.getElementById("delete").onclick = () => {
    Drawable.instances = Drawable.instances.filter(
        (item) => !selection.includes(item)
    );
    selection = [];
    Drawable.drawAll();
};

//new Line(0,0,100,100, "red")
////new Circle(30,30,10, "red")

////canvas.onmousemove = function(e){
////}

//undo.onclick = function(){
//Drawable.instances.pop()
////Drawable.instances = []
//Drawable.drawAll()
//}
