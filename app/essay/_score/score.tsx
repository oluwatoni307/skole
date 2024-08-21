"use client";

import React from "react";
import Feedback from "./feedback";
import { Badge } from "@/components/ui/badge";
import PGBar from "./pgbar";
import { useAtom } from "jotai";
import { scoreAtom } from "@/app/sharedState";

type Props = {};

export default function Score({}: Props) {
  const [score, setScore] = useAtom<any>(scoreAtom);
  return (
    <div className="w-[225px] flex-col items-center gap-5 flex justify-center border-r px-2">
      <PGBar value={score} />
      <div className="flex flex-col">
        <Badge className="text-base rounded-b-none" variant={"outline"}>
          AI Feedback
        </Badge>
        <Feedback />
      </div>
    </div>
  );
}
