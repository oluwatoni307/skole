import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Feedback from AI
export const feedbackAtom = atom("");

// 0%
export const scoreAtom = atom(0);

// Rubric Array
export const rubricAtom = atomWithStorage(
  "rubric",
  Array(4).fill(Array(5).fill("")),
);
export const gradeAtom = atom("");

export const aiReliabilityAtom = atom("");

// Course Name
export const courseAtom = atomWithStorage("course", "");

// Assignment Instructions
export const instructionsAtom = atomWithStorage("instructions", "");

// Essay Text
export const essayAtom = atomWithStorage("essay", "");
export const csvDataAtom = atom<{ [key: string]: any[] }>({});
