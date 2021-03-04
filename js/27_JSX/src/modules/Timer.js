import React, { Component, useEffect, useState, useRef } from "react";

export const Timer = ({ sec = 0, startWithPause = true }) => {
    const ifSecIsNan = function (sec) {
        if (isNaN(sec)) return 0;
        return sec;
    };

    const [timeLeft, setTimeLeft] = useState(ifSecIsNan(sec));
    const [pause, setPause] = useState(startWithPause);
    const clockface = useRef(null);

    useEffect(() => {
        setTimeLeft(sec);
        setPause(startWithPause);
        // return () => console.log("помер");
    }, [sec, startWithPause]);

    let h, m, s;

    h = Math.floor(timeLeft / 3600);
    m = Math.floor((timeLeft - h * 60 * 60) / 60);
    s = timeLeft - h * 60 * 60 - m * 60;

    if (timeLeft === 0) {
        clockface.current && (clockface.current.style.backgroundColor = "red");
    } else {
        clockface.current && (clockface.current.style.backgroundColor = "white");
    }

    const decTime = () => {
        if (!pause && timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
        }
    };

    setTimeout(decTime, 1000);

    return (
        <>
            {/* prettier-ignore */}
            <span ref = {clockface} style={{ border: "2px solid gray" }}>
                {`--- ${h}:${m.toString().padStart(2, 0)}:${s.toString().padStart(2, 0)} ---`}
            </span>
            <button onClick={() => setPause(!pause)}>{(pause && "Continue") || "Pause"}</button>
        </>
    );
};
