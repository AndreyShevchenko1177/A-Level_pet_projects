import React, { Component, useEffect, useState, useRef } from "react";
import clockFace from "../imgages/ClockFace.png";
import clockFaceH from "../imgages/ClockFace_H.png";
import clockFaceM from "../imgages/ClockFace_M.png";
import clockFaceS from "../imgages/ClockFace_S.png";
import { Timer } from "./Timer";

export const TimerPresentation = ({ seconds }) => (
    <h1>
        <Timer sec={seconds} startWithPause={true} />
    </h1>
);

export const WatchPresentation = ({ seconds = 0 }) => {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    let sDeg = s * 6; // 360°:60сек = 6° для одной минуты и для 1 секунды
    let mDeg = (m + s / 60) * 6;
    let hDeg = (h + m / 60 + s / 3600) * 30; // 360°:12часов = 30° для одного часа

    return (
        <>
            {`${seconds} - ${h}:${m}:${s}`}
            <div className="watch">
                <img src={clockFace} alt=""></img>
                <img
                    src={clockFaceH}
                    alt=""
                    style={{ transform: `rotate(${hDeg}deg)` }}
                ></img>
                <img
                    src={clockFaceM}
                    alt=""
                    style={{ transform: `rotate(${mDeg}deg)` }}
                ></img>
                <img
                    src={clockFaceS}
                    alt=""
                    style={{ transform: `rotate(${sDeg}deg)` }}
                ></img>
            </div>
        </>
    );
};
