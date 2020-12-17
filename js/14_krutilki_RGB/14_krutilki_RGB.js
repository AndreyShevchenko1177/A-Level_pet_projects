function Control(el, { value = 0, step = 1, max = 100, min = 0, maxAngle = 360, minAngle = 0 } = {}) {
    const img = document.createElement("img");
    img.src = "./1@3xNew.png";
    img.width = "200";
    el.append(img);

    const ratio = (maxAngle - minAngle) / (max - min);

    const value2Deg = () => ratio * (value - min) + minAngle;

    const changeValue = (delta, fireEvent = false) => {
        let newValue = value + delta;
        if (newValue >= max) newValue = max;
        if (newValue <= min) newValue = min;

        value = newValue;

        //console.log(value)

        if (fireEvent && this.onChange && typeof this.onChange === "function") {
            this.onChange(value);
        }

        img.style.transform = `rotate(${value2Deg()}deg)`;
    };

    const { top, left } = img.getBoundingClientRect();

    changeValue(0);

    console.log(img.width, top, left);

    // img.onclick = (e) => {
    //     changeValue(e.clientX - left > img.width / 2 ? step : -step, true);
    // };

    img.onmousewheel = (e) => {
        changeValue((e.deltaY * step) / 25, true);
        e.preventDefault();
    };

    let startDragAngle;

    const calcAngle = ({ layerX, layerY }) => {
        const deltaX = layerX - img.width / 2;
        const deltaY = layerY - img.height / 2;
        return (Math.atan2(deltaY, deltaX) / Math.PI) * 180;
    };

    img.onmousedown = (e) => {
        startDragAngle = calcAngle(e);
        e.preventDefault();
    };

    img.onmousemove = (e) => {
        if (startDragAngle !== undefined) {
            const currentAngle = calcAngle(e);
            let deltaAngle = currentAngle - startDragAngle;

            // дальше идет коррекция перехода через +-180 градусов
            // но из-за функции onclick осталось иногда подергивание
            // при выкручивании в крайние положения
            // onclick пришлось отключить
            if (Math.abs(deltaAngle) >= 180) {
                deltaAngle += deltaAngle < 0 ? 360 : -360;
            } else {
                deltaAngle += deltaAngle < 0 ? -360 : 360;
            }
            deltaAngle = deltaAngle % 360;

            changeValue(deltaAngle / ratio, true);
            startDragAngle = currentAngle;
            e.preventDefault();
        }
    };

    img.onmouseup = img.onmouseout = (e) => {
        if (startDragAngle) {
            startDragAngle = undefined;
            e.preventDefault();
        }
    };

    this.setValue = (v) => changeValue(v - value);
    this.changeValue = changeValue;

    this.getValue = () => value;
}

//

//

//

const audio = document.getElementById("myaudio");

const volumeControl = new Control(volume, { max: 1, min: 0, step: 0.01 });
volumeControl.onChange = (value) => {
    audio.volume = value;
    volumeLevel.value = Math.round(value * 100);
    console.log("VOLUME ", volumeLevel.value);
};

volumeLevel.oninput = () => {
    audio.volume = volumeLevel.value / 100;
    volumeControl.setValue(audio.volume);
    console.log("VOLUME ", Math.round(volumeControl.getValue() * 100));
};

volumeLevel.value = 0;
audio.volume = 0;

// ----------------------------------------------------------

const newColor = function (element, value) {};

const redControl = new Control(redDiv, { max: 255, maxAngle: 150, minAngle: -150 });
redControl.onChange = (value) => {
    redDiv.setAttribute("style", `background : rgb(${value}, 0, 0)`);
    rgbDiv.setAttribute("style", `background : rgb(${value}, ${greenLevel.value}, ${blueLevel.value})`);
    redLevel.value = Math.round(value);
    console.log("RED", Math.round(value));
};

redLevel.oninput = () => {
    rgbDiv.setAttribute("style", `background : rgb(${redLevel.value}, ${greenLevel.value}, ${blueLevel.value})`);
    redDiv.setAttribute("style", `background : rgb(${redLevel.value}, 0, 0)`);
    redControl.setValue(Math.round(redLevel.value));
    console.log("RED ", Math.round(redControl.getValue()));
};

redLevel.value = 0;
redDiv.setAttribute("style", "background : rgb(0, 0, 0)");

// ----------------------------------------------------------

const greenControl = new Control(greenDiv, { max: 255, maxAngle: 150, minAngle: -150 });
greenControl.onChange = (value) => {
    greenDiv.setAttribute("style", `background : rgb(0, ${value}, 0)`);
    rgbDiv.setAttribute("style", `background : rgb(${redLevel.value}, ${value}, ${blueLevel.value})`);
    greenLevel.value = Math.round(value);
    console.log("GREEN", Math.round(value));
};

greenLevel.oninput = () => {
    rgbDiv.setAttribute("style", `background : rgb(${redLevel.value}, ${greenLevel.value}, ${blueLevel.value})`);
    greenDiv.setAttribute("style", `background : rgb(0, ${greenLevel.value}, 0)`);
    greenControl.setValue(Math.round(greenLevel.value));
    console.log("GREEN ", Math.round(greenControl.getValue()));
};

greenLevel.value = 0;
greenDiv.setAttribute("style", "background : rgb(0, 0, 0)");

// ----------------------------------------------------------

const blueControl = new Control(blueDiv, { max: 255, maxAngle: 150, minAngle: -150 });
blueControl.onChange = (value) => {
    blueDiv.setAttribute("style", `background : rgb(0, 0, ${value})`);
    rgbDiv.setAttribute("style", `background : rgb(${redLevel.value}, ${greenLevel.value}, ${value})`);
    blueLevel.value = Math.round(value);
    console.log("BLUE", Math.round(value));
};

blueLevel.oninput = () => {
    rgbDiv.setAttribute("style", `background : rgb(${redLevel.value}, ${greenLevel.value}, ${blueLevel.value})`);
    blueDiv.setAttribute("style", `background : rgb(0, 0, ${blueLevel.value})`);
    blueControl.setValue(Math.round(blueLevel.value));
    console.log("BLUE ", Math.round(blueControl.getValue()));
};

blueLevel.value = 0;
blueDiv.setAttribute("style", "background : rgb(0, 0, 0)");

// ----------------------------------------------------------

rgbDiv.setAttribute("style", "background : rgb(0, 0, 0)");
