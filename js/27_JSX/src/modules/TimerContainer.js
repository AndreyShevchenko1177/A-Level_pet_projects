import React, { Component, useEffect, useState, useRef } from "react";

const SecondsTimer = ({ seconds }) => <h2>{seconds}</h2>;

export const TimerContainer = ({
    seconds = 0,
    refresh = 100,
    clickNumber = 0,
    render: Render = SecondsTimer,
}) => {
    const [startMoment, setStartMoment] = useState(performance.now());
    const [timeLeft, setTimeLeft] = useState(seconds);
    const [clickCount, setClickCount] = useState(0);
    const count = useRef(1);
    const intervalId = useRef(null);

    // console.log(timeLeft, clickCount);

    const trackTime = () => {
        intervalId.current = setInterval(() => {
            console.log("interval");
            if (timeLeft >= count.current) {
                if ((performance.now() - startMoment) / 1000 > count.current) {
                    count.current++;
                    setTimeLeft((prev) => prev - 1);
                }
            } else clearInterval(intervalId.current);
        }, refresh);
    };

    useEffect(() => {
        clearInterval(intervalId.current);
        setClickCount(clickNumber);
        setTimeLeft(seconds);
        count.current = 1;
        setStartMoment(performance.now());
        trackTime();
        return () => clearInterval(intervalId.current);
    }, [clickNumber]);

    return (
        <>
            <Render seconds={timeLeft} />
        </>
    );
};
