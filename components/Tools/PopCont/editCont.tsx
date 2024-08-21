//@ts-nocheck
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { instructionsAtom, courseAtom } from "@/app/sharedState";
import { useAtom } from "jotai";

type Props = {};

export default function EditCont({}: Props) {
  const [course, setCourse] = useAtom<any>(courseAtom);
  const [instructions, setInstructions] = useAtom<any>(instructionsAtom);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <Badge variant={"secondary"} className="w-fit">
            Course Name
          </Badge>
          <Input
            className="border border-paco"
            onChange={(e) => setCourse(e.target.value)}
            type="text"
            name="course"
            id="course"
            placeholder='Ex: "English Honors"'
            value={course}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Badge variant={"secondary"} className="w-fit">
            Assignment Instructions
          </Badge>
          <Textarea
            className="border min-h-[150px]"
            onChange={(e) => setInstructions(e.target.value)}
            name="assignment"
            id="assignment"
            placeholder='Ex: "Write an essay regarding the use of pathos in Macbeth."'
            value={instructions}
          />
        </div>
      </div>
      {/* <Button>Save</Button> */}
    </div>
  );
}
