import React, { useRef, forwardRef } from "react";
import { useAtom } from "jotai";
import { feedbackAtom } from "@/app/sharedState";

type Props = {
  // No AiFeedback prop if not used
};

export type FeedBackHandles = {
  feedBackRef: HTMLDivElement | null;
};

const Feedback = forwardRef<FeedBackHandles, Props>((_, ref) => {
  const [feedback] = useAtom(feedbackAtom); // Assuming feedbackAtom provides the feedback value
  const feedBackRef = useRef<HTMLDivElement>(null);

  // Optional: Use ref if needed for any external interactions
  React.useImperativeHandle(ref, () => ({
    feedBackRef: feedBackRef.current,
  }));

  return (
    <div
      ref={feedBackRef}
      className="w-full flex text-sm bg-darkpaco p-2 border rounded-lg rounded-t-none border-t-0"
    >
      {feedback}
    </div>
  );
});

export default Feedback;
