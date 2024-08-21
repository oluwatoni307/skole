"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { aiReliabilityAtom, gradeAtom } from "@/app/sharedState";
import { useAtom } from "jotai";

type Props = {
  value: number;
  
};
export type PGBarHandles = {
  scoreRef: HTMLDivElement | null;
  gradeRef: HTMLDivElement | null;
  AiReliabilityRef: HTMLDivElement | null;
};
const PGBar = forwardRef<PGBarHandles, Props>(({value}, ref) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [grade] = useAtom(gradeAtom);
  const [reliable] = useAtom(aiReliabilityAtom);
  
const scoreRef = useRef<HTMLDivElement>(null);
const gradeRef = useRef<HTMLDivElement>(null);
const AiReliabilityRef = useRef<HTMLDivElement>(null);

useImperativeHandle(ref, () => ({
  scoreRef: scoreRef.current,
  gradeRef: gradeRef.current,
  AiReliabilityRef: AiReliabilityRef.current,
}));
  
  useEffect(() => {
    const animationDuration = 2200; // Duration of the animation in milliseconds
    const animationSteps = 60; // Number of animation steps
    const incrementValue = Math.ceil(value / animationSteps);
    const updateValue = () => {
      setCurrentValue((prevValue) => {
        const newValue = prevValue + incrementValue;
        return newValue > value ? value : newValue;
      });
    };
    const animationInterval = setInterval(
      updateValue,
      animationDuration / animationSteps
    );
    return () => {
      clearInterval(animationInterval);
    };
  }, [value]);

  let colorClass = "";

  if (currentValue <= 50) {
    colorClass = "text-red-500";
  } else if (currentValue <= 75) {
    colorClass = "text-yellow-500";
  } else {
    colorClass = "text-green-500";
  }

  


  return (
    <>
    <div
      className={`radial-progress ${colorClass} ${value}`}
      //@ts-ignore
      style={{ "--value": currentValue, "--size": "9rem" }}
    >
      <div ref={scoreRef} className="text-white font-semibold text-3xl">{currentValue}%</div>
      <div ref={gradeRef} className="text-white font-semibold text-3xl p-4">{grade}</div>
    </div>
    <div ref={AiReliabilityRef} className="text-white font-semibold text-1xl">{reliable}</div>
    </>
  );
});
export default PGBar;