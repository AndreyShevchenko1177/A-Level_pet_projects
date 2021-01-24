const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvWidth = canvas.width;
const canvHeight = canvas.height;

let current;
let selection = [];

const tools = {
    graffity: {
        mousemove(e) {
            //e.buttons 0b00000x11 & 0b00000100 == x
            e.buttons & 1 &&
                // new Circle(e.layerX, e.layerY, +size.value, color.value);
                new Ellipse(
                    e.layerX,
                    e.layerY,
                    +size.value,
                    +size.value,
                    color.value
                );
        },
    },

    // ------- а круг - это частный случай элипса :) - просто зажми клавишу Ctrl
    //
    // circle: {
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
    // },

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

    rectangle: {
        mousedown(e) {
            current = new Rectangle(e.layerX, e.layerY, 1, 1, color.value);
        },
        mousemove(e) {
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
        itWasMousemove: false,

        click(e) {
            let found = [];
            if (!tools.select.itWasMousemove) {
                found = Drawable.instances.filter(
                    (c) => c.in && c.in(e.layerX, e.layerY)
                );
                // ------   такая логика мне кажется более естественной ------
                // но это уже из вопросов "идеологии партии" (программного продукта)
                //
                if (found[0]) {
                    found = [found.pop()];
                }
                if (!e.ctrlKey) {
                    selection = [];
                }

                selection = selection.concat(found);
                Drawable.drawAll(selection);
            }
            tools.select.itWasMousemove = false;
        },

        mousedown(e) {
            current = new Rectangle(e.layerX, e.layerY, 1, 1, "#8F8F8F", true);
        },

        mousemove(e) {
            if (!current) return;
            tools.select.itWasMousemove = true;
            let deltaX = current.distanceTo(e.layerX, current.y);
            let deltaY = current.distanceTo(current.x, e.layerY);
            current.width = e.layerX > current.x ? deltaX : -deltaX;
            current.height = e.layerY > current.y ? deltaY : -deltaY;
            Drawable.drawAll();
        },

        mouseup(e) {
            Drawable.instances.pop();

            let found = Drawable.instances.filter(
                (c) =>
                    c.inBounds &&
                    c.inBounds(
                        current.x,
                        current.y,
                        current.width,
                        current.height
                    )
            );

            if (!e.ctrlKey) {
                selection = [];
            }

            selection = selection.concat(found);
            Drawable.drawAll(selection);
            current = null;
        },
    },
};

function superHandler(evt) {
    let t = tools[tool.value];
    // надо же еще и проверить вообще наличие такой опции
    if (t && typeof t[evt.type] === "function") {
        t[evt.type].call(this, evt);
    }
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
    ctx.clearRect(0, 0, canvWidth, canvHeight);
    Drawable.forAll((item) => item.draw());
    selection.forEach((item) => item.draw(true));
};

Drawable.forAll = function (callback) {
    for (var i = 0; i < Drawable.instances.length; i++) {
        callback(Drawable.instances[i]);
    }
};

// ---- Круг - это частный случай элипса ----
//
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
//             // проба чтоб цвет контура отличался от цвета заливки
//             // но надо дорабатывать логику
//             ctx.strokeStyle =
//                 "#" +
//                 (
//                     (0x7fffff + parseInt("0x" + this.color.slice(1))) %
//                     0xffffff
//                 ).toString(16);
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
            ctx.lineWidth = 5;
            // проба чтоб цвет контура отличался от цвета заливки
            // но надо дорабатывать логику
            // prettier-ignore
            ctx.strokeStyle =
                "#" + ((0x7fffff + parseInt("0x" + this.color.slice(1))) % 0xffffff).toString(16);
            ctx.stroke();
        }
        ctx.fill();
    }

    in(x, y) {
        return (
            (x - this.x) ** 2 / this.radiusX ** 2 +
                (y - this.y) ** 2 / this.radiusY ** 2 <=
            1
        );
        // (x**2)/a**2 + (y**2)/b**2 = 1 - формула элипса
    }

    inBounds(x, y, width, height) {
        let minX = Math.min(x, x + width);
        let minY = Math.min(y, y + height);
        let maxX = Math.max(x, x + width);
        let maxY = Math.max(y, y + height);

        return (
            Math.min(this.x - this.radiusX, this.x + this.radiusX) >= minX &&
            Math.max(this.x - this.radiusX, this.x + this.radiusX) <= maxX &&
            Math.min(this.y - this.radiusY, this.y + this.radiusY) >= minY &&
            Math.max(this.y - this.radiusY, this.y + this.radiusY) <= maxY
        );
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

    draw(selected) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        // prettier-ignore
        ctx.strokeStyle = selected ?
            "#" + ((0x7fffff + parseInt("0x" + this.color.slice(1))) % 0xffffff ).toString(16)
            : this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }

    in(x, y) {
        // prettier-ignore
        if (
            !(x > Math.min(this.x - this.lineWidth, this.x + this.width + this.lineWidth) &&
                x < Math.max(this.x - this.lineWidth, this.x + this.width + this.lineWidth) &&
                y > Math.min(this.y - this.lineWidth, this.y + this.height + this.lineWidth) &&
                y < Math.max(this.y - this.lineWidth, this.y + this.height + this.lineWidth)
            )
        ) {
            return false;
        }

        // prettier-ignore
        let aureoleArr = [
            Math.atan((y + this.lineWidth / 2 - this.y) / (x - this.lineWidth / 2 - this.x)),
            Math.atan((y + this.lineWidth / 2 - this.y) / (x + this.lineWidth / 2 - this.x)),
            Math.atan((y - this.lineWidth / 2 - this.y) / (x + this.lineWidth / 2 - this.x)),
            Math.atan((y - this.lineWidth / 2 - this.y) / (x - this.lineWidth / 2 - this.x)),
        ];

        let ownAngle = Math.atan(this.height / this.width);
        let maxAngle = Math.max(...aureoleArr);
        let minAngle = Math.min(...aureoleArr);
        if (maxAngle - minAngle > Math.PI / 2) {
            if (maxAngle > Math.PI) {
                minAngle += Math.PI;
            } else {
                maxAngle -= Math.PI;
            }

            [maxAngle, minAngle] = [minAngle, maxAngle];

            if (this.width * this.height > 0) {
                ownAngle = ownAngle * -1;
            }
        }

        return minAngle <= ownAngle && ownAngle <= maxAngle;
    }

    inBounds(x, y, width, height) {
        let minX = Math.min(x, x + width);
        let minY = Math.min(y, y + height);
        let maxX = Math.max(x, x + width);
        let maxY = Math.max(y, y + height);

        return (
            Math.min(this.x, this.x + this.width) >= minX &&
            Math.max(this.x, this.x + this.width) <= maxX &&
            Math.min(this.y, this.y + this.height) >= minY &&
            Math.max(this.y, this.y + this.height) <= maxY
        );
    }
}

class Rectangle extends Drawable {
    constructor(x, y, width, height, color, isSelectTool = false) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.draw();
        this.isSelectTool = isSelectTool;
    }

    draw(selected) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.isSelectTool ? 1 : 5;
        // проба чтоб цвет контура отличался от цвета заливки
        // но надо дорабатывать логику (подобрать цвет)
        // prettier-ignore
        if (selected) {
            ctx.strokeStyle =
                "#" + ((0x7fffff + parseInt("0x" + this.color.slice(1))) % 0xffffff).toString(16);
        } else {
            ctx.strokeStyle = this.color;
        }

        if (this.isSelectTool || selected) {
            ctx.stroke();
        }

        if (!this.isSelectTool) {
            ctx.fill();
        }
    }

    in(x, y) {
        return (
            Math.min(this.x, this.x + this.width) <= x &&
            x <= Math.max(this.x, this.x + this.width) &&
            Math.min(this.y, this.y + this.height) <= y &&
            y <= Math.max(this.y, this.y + this.height)
        );
    }

    inBounds(x, y, width, height) {
        let minX = Math.min(x, x + width);
        let minY = Math.min(y, y + height);
        let maxX = Math.max(x, x + width);
        let maxY = Math.max(y, y + height);

        return (
            Math.min(this.x, this.x + this.width) >= minX &&
            Math.max(this.x, this.x + this.width) <= maxX &&
            Math.min(this.y, this.y + this.height) >= minY &&
            Math.max(this.y, this.y + this.height) <= maxY
        );
    }
}

// c oninput  повеселее
color.oninput = () => {
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

document.getElementById("undo").onclick = () => {
    Drawable.instances.pop();
    selection = [];
    Drawable.drawAll();
};

clear.onclick = () => {
    selection = [];
    Drawable.instances = [];
    ctx.clearRect(0, 0, canvWidth, canvHeight);
};

tool.onchange = () => {
    comment.innerText = "";

    if (tool.value === "circle" || tool.value === "ellipse") {
        comment.innerText = "Круг - этот тот же элипс, но +CTRL";
    }

    if (tool.value === "rectangle") {
        comment.innerText = "Квадрат = прямоугольник + CTRL";
    }
};
