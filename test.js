let wrapper = function (func, ...bondArg) {};
return function (...arg) {
    return func.call(this, ...bondArg, ...arg);
};

//

//

let mult = function (a, b) {
    return a + b;
};

let plus2 = mult.bind(null, 2);

plus2(5);

// let mult = mult.bind(null, 2);

mult(5); // ==7

// let plus2 = mult.bind(null, 2);

mult(5); // ==4

//

//// +++++++=+==+=+=+=+=5651651

fetch("https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.json")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    });
console.log(1);

let someTree = {
    tagName: "table", //html tag
    subTags: [
        //вложенные тэги
        {
            tagName: "tr",
            subTags: [
                {
                    tagName: "td",
                    text: "some text",
                },
                {
                    tagName: "td",
                    text: "some text 2",
                },
            ],
        },
    ],
    attrs: {
        border: 1,
    },
};

let drawSomeTree = "";

drawSomeTree += "<" + someTree.tagName;
if ("attrs" in someTree) {
    drawSomeTree += someTree.attrs;
}
drawSomeTree += ">";
if ("subTags" in someTree) {
    for (let i of someTree.subTags) {
        if ("tagName" in i) {
            drawSomeTree += "<" + i.tagName;
        }
        if ("attrs" in i) {
            drawSomeTree += i.attrs;
        }
        drawSomeTree += ">";
        if ("subTags" in i) {
            for (let j of i.subTags) {
                if ("tagName" in j) {
                    drawSomeTree += "<" + j.tagName;
                }
                if ("attrs" in j) {
                    drawSomeTree += j.attrs;
                }
                drawSomeTree += ">";
                if ("text" in j) {
                    drawSomeTree += j.text;
                }
                drawSomeTree += "</" + j.tagName + ">";
            }
        }
        drawSomeTree += "</" + i.tagName + ">";
    }
}
drawSomeTree += "</" + someTree.tagName + ">";

console.log(drawSomeTree);
document.write(drawSomeTree);
