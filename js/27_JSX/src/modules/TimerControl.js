import React, { Component, useEffect, useState, useRef } from "react";
import { Timer } from "./Timer";

export const TimerControl = ({ counter: Counter = Timer, ...props }) => {
    const [totalSec, setTotalSec] = useState(0);
    const input_H_ref = useRef(null);
    const input_M_ref = useRef(null);
    const input_S_ref = useRef(null);
    const [clickCount, setClickCount] = useState(0);

    const countTotalSec = function () {
        let total =
            (input_H_ref.current.value * 3600 || 0) +
            (input_M_ref.current.value * 60 || 0) +
            (parseInt(input_S_ref.current.value, 10) || 0);
        // interimSec.current = total;
        setTotalSec(total);
    };

    return (
        <>
            <input
                ref={input_H_ref}
                // onInput={countTotalSec}
                placeholder="hh"
                type="number"
                min="0"
            />
            <input
                ref={input_M_ref}
                // onInput={countTotalSec}
                placeholder="mm"
                type="number"
                min="0"
                max="59"
            />
            <input
                ref={input_S_ref}
                // onInput={countTotalSec}
                placeholder="ss"
                type="number"
                min="0"
                max="59"
            />

            <button
                onClick={() => {
                    countTotalSec();
                    setClickCount((prev) => prev + 1);
                    // setMySwitch(!mySwitch);
                }}
            >
                Start
            </button>

            {
                <Counter
                    sec={totalSec}
                    seconds={totalSec}
                    startWithPause={false}
                    clickNumber={clickCount}
                    {...props}
                    key={clickCount}
                />
            }
        </>
    );
};
