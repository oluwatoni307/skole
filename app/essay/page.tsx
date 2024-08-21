"use client";

import React, { useRef, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Submit from "./submit";
import { useAtom } from "jotai";
import {
  rubricAtom,
  courseAtom,
  instructionsAtom,
  essayAtom,
} from "@/app/sharedState";
import {
  loadPredefinedCSVs,
  parseUploadedCSV,
  addCSVData,
} from "@/app/essay/rubric_handler/csv_handler";
import { csvDataAtom } from "@/app/sharedState";

export default function Home() {
  const [course, _setCourse] = useAtom<string>(courseAtom);
  const [essayValue, setEssayValue] = useAtom<string>(essayAtom);
  const [instructions, _setInstructions] = useAtom<string>(instructionsAtom);

  const [csvData, setCsvData] = useAtom(csvDataAtom);
  const [csvKeys, setCsvKeys] = useState<string[]>([]);
  const [rubric, setRubric] = useAtom(rubricAtom);

  // Load predefined CSVs on component mount
  useEffect(() => {
    loadPredefinedCSVs().then((data) => {
      setCsvData(data); // Update the shared state
      setCsvKeys(Object.keys(data)); // Extract and store keys
      setRubric(data[Object.keys(data)[0]]); // Load the first rubric as default
    });
  }, []);
  // Stringify Rubric
  let rubricInformation = `| Grades/Criteria | ${Array.from(
    { length: rubric.length - 1 },
    (_, i) => `Level ${i + 1}`,
  ).join(" | ")} |\n`;

  for (let i = 0; i < rubric.length; i++) {
    const rowContent = rubric[i]
      .map((rowItem: any) => rowItem.trim())
      .join(" | ");

    rubricInformation +=
      `| ${rowContent} |` + (i == rubric.length - 1 ? "" : "\n");
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <div>
          <Textarea
            value={essayValue}
            //@ts-ignore
            onChange={(e) => setEssayValue(e.target.value)}
            className="min-h-[80vh] resize-none text-2xl"
            autoFocus
            placeholder="Start writing here..."
          ></Textarea>
        </div>
        <Submit
          studentEssay={essayValue}
          rubricInformation={rubricInformation}
          courseInformation={course}
          assignmentInstructions={instructions}
        />
      </div>
    </div>
  );
}
