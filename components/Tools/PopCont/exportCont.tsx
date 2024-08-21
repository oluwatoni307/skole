import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import { aiReliabilityAtom, essayAtom, feedbackAtom, gradeAtom, scoreAtom } from "@/app/sharedState";
import { useAtom } from "jotai";
import PGBar, { PGBarHandles } from '@/app/essay/_score/pgbar';
import Feedback, { FeedBackHandles } from '@/app/essay/_score/feedback';
import Submit, { EssayHandles } from '@/app/essay/submit';

export default function exportCont() {
  const [currentValue, setCurrentValue] = useAtom(scoreAtom);
  const [grade, setGrade] = useAtom(gradeAtom);
  const [reliable, setReliability] = useAtom(aiReliabilityAtom);
  const [feedback, setFeedback] = useAtom(feedbackAtom);
  const [essay, setEssayOverview] = useAtom(essayAtom);

  const pgBarRefs = useRef<PGBarHandles>(null);
  const feedBackRef = useRef<FeedBackHandles>(null);
  const essayRef = useRef<EssayHandles>(null);

  
  useEffect(() => {
    if (pgBarRefs.current) {
      let gradeText = pgBarRefs.current.gradeRef?.innerText || '';
      setGrade(gradeText);
      setReliability(pgBarRefs.current.AiReliabilityRef?.innerText || '');
    }

    if (feedBackRef.current) {
      setFeedback(feedBackRef.current.feedBackRef?.innerText || '');
    }

    if (essayRef.current) {
      setEssayOverview(essayRef.current.essayRef?.innerText || '');
    }
  }, []);

  const exportToPDF = (
    currentValue: number,
    grade: string,
    reliabilityIndex: string,
    feedback: string,
    essay: string
  ) => {
    const doc = new jsPDF();

    const maxWidth = 180;
    let yPosition = 10;

    doc.text(`Score: ${currentValue}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Grade: ${grade}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Feedback: ${feedback}`, 10, yPosition);
    yPosition += 10;
    doc.text(`AI Reliability Index: ${reliabilityIndex}`, 10, yPosition);
    yPosition += 10;
   
    yPosition += 20;
    const feedbackLines:string[] = doc.splitTextToSize(feedback, maxWidth);
    feedbackLines.forEach(line => {
      doc.text(line, 10, yPosition);
      yPosition += 10; 
    });
    
    yPosition += 20;
    const essayLines:string[] = doc.splitTextToSize(essay, maxWidth);
    essayLines.forEach(line => {
      doc.text(line, 10, yPosition);
      yPosition += 10
    doc.save('export.pdf');
  })};
  return (
    <div>
      <h3 className="text-lg font-bold">Overview</h3>
      <p>
        <strong>Grade:</strong> {grade}
      </p>
      <p>
        <strong>Score:</strong> {currentValue}
      </p>
      <p>
        <strong>Reliability:</strong> {reliable}
      </p>
      <p>
        <strong>Feedback:</strong> {feedback}
      </p>

      <button
        className="mt-4 bg-white text-black p-2 rounded"
        onClick={() => exportToPDF(currentValue, grade, reliable, feedback, essay)}
      >
        Export to PDF
      </button>
    </div>
  );

};