"use client";
import { Text, Type, Upload, Image } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { essayAtom } from "@/app/sharedState";
import { useAtom } from "jotai";
import RubricCont from "./rubricCont1";
import ToolButton from "../toolButton";
import axios from "axios";
import {
  loadPredefinedCSVs,
  parseUploadedCSV,
  addCSVData,
} from "@/app/essay/rubric_handler/csv_handler";
import { csvDataAtom } from "@/app/sharedState";

export default function UploadCont() {
  const [csvData, setCsvData] = useAtom(csvDataAtom);

  // Handle rubric upload
  const [fileName, setFileName] = useState<string>("");
  const [fileInput, setFileInput] = useState<any>();
  const [imageName, setImageName] = useState<string>("");
  const [imageInput, setImageInput] = useState<any>();
  const [textName, setTextName] = useState<string>("");
  const [textInput, setTextInput] = useState<any>();
  const [rubricName, setRubricName] = useState<string>("");
  const [rubricInput, setRubricInput] = useState<any>();
  const [essayValue, setEssayValue] = useAtom<string>(essayAtom);

  // Handle rubric upload
  const handleRubricsChange = (event: any) => {
    const file = event.target.files[0];

    if (file.type !== "text/csv") {
      alert("Please upload a valid CSV file.");
      return;
    }

    parseUploadedCSV(file)
      .then((newCSVData) => {
        addCSVData(csvData, newCSVData);
        setCsvData({ ...csvData }); // Update the shared state
      })
      .catch((error) => console.error(error));
  };

  // Handle PDF file upload
  const handleFileChange = (event: any) => {
    if (event.target.files[0].type !== "application/pdf") {
      alert("Please upload a valid pdf file.");
      return;
    }
    axios
      .post(
        "https://grade-ai-ed153ea53b42.herokuapp.com/pdf",
        {
          file: event.target.files[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        //@ts-ignore
        setEssayValue(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setFileInput(undefined);
        setFileName("");
      });
  };

  const handleImageChange = (event: any) => {
    if (
      event.target.files[0].type !== "image/png" &&
      event.target.files[0].type !== "image/jpeg"
    ) {
      alert("Please upload a valid image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    axios
      .post("https://grade-ai-ed153ea53b42.herokuapp.com/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        //@ts-ignore
        setEssayValue(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setImageInput(undefined);
        setImageName("");
      });
  };

  const handleTextChange = (event: any) => {
    const file = event.target.files[0];

    if (file.type !== "text/plain") {
      alert("Please upload a valid text file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      //@ts-ignore
      const contents = e.target.result;
      //@ts-ignore
      setEssayValue(contents);
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex-col p-4 flex gap-3">
      <div className="flex gap-4 w-[600px] min-h-[200px]">
        {/* Existing UI elements for file uploads */}
        <div className="flex flex-col gap-1 w-1/3">
          <Badge variant={"secondary"}>Upload Rubrics</Badge>
          <label
            htmlFor="rubrics-upload"
            className="flex h-full cursor-pointer items-center justify-center rounded-md border border-dashed w-full"
          >
            {rubricInput ? (
              <p className="text-ellipsis overflow-hidden p-4">{rubricName}</p>
            ) : (
              <Upload size={48} />
            )}

            <input
              type="file"
              id="rubrics-upload"
              className="hidden"
              onChange={handleRubricsChange}
            />
          </label>
        </div>
        {/* Other upload components */}
        <div className="flex flex-col gap-1 w-1/3">
          <Badge variant={"secondary"}>Upload Raw Text File</Badge>
          <label
            htmlFor="text-upload"
            className="flex h-full cursor-pointer items-center justify-center rounded-md border border-dashed w-full"
          >
            {textInput ? (
              <p className="text-ellipsis overflow-hidden p-4">{textName}</p>
            ) : (
              <>
                <Type size={48} />
              </>
            )}
            <input
              type="file"
              id="text-upload"
              className="hidden"
              onChange={handleTextChange}
            />
          </label>
        </div>
        <div className="flex flex-col gap-1 w-1/3">
          <Badge variant={"secondary"}>Upload PDF</Badge>
          <label
            htmlFor="file-upload"
            className="flex h-full cursor-pointer items-center justify-center rounded-md border border-dashed w-full"
          >
            {fileInput ? (
              <p className="text-ellipsis overflow-hidden p-4">{fileName}</p>
            ) : (
              <>
                <Upload size={48} />
              </>
            )}
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="flex flex-col gap-1  w-1/3">
          <Badge variant={"secondary"}>Upload Photo</Badge>
          <label
            htmlFor="image-upload"
            className="flex h-full cursor-pointer items-center justify-center rounded-md border border-dashed w-full"
          >
            {imageInput ? (
              <p className="text-ellipsis overflow-hidden p-4">{imageName}</p>
            ) : (
              <>
                <Image size={48} />
              </>
            )}
            <input
              type="file"
              id="image-upload"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
