// csvHandler.ts

// Function to load predefined CSV files with filenames as keys
export const loadPredefinedCSVs = async (): Promise<{
  [key: string]: any[];
}> => {
  const csvFiles = ["/sample.csv"]; // Replace with actual paths
  const csvDataObject: { [key: string]: any[] } = {};

  for (const csvFile of csvFiles) {
    const response = await fetch(csvFile);
    const csvText = await response.text();
    const parsedData = parseCSV(csvText);
    const fileName = extractFileName(csvFile);
    csvDataObject[fileName] = parsedData;
  }

  return csvDataObject;
};

// Function to parse an uploaded CSV file and return it with the filename as key
export const parseUploadedCSV = (
  file: File,
): Promise<{ [key: string]: any[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const csvContent = event.target?.result;
      if (typeof csvContent === "string") {
        const parsedData = parseCSV(csvContent);
        const fileName = extractFileName(file.name);
        resolve({ [fileName]: parsedData });
      } else {
        reject("Failed to read file");
      }
    };

    reader.onerror = () => reject("Error reading file");

    reader.readAsText(file);
  });
};

// Function to add parsed CSV data to the existing data object using filename as key
export const addCSVData = (
  dataObject: { [key: string]: any[] },
  newCSV: { [key: string]: any[] },
) => {
  Object.assign(dataObject, newCSV);
};

// Helper function to parse CSV text into an array of arrays
const parseCSV = (csvText: string): any[] => {
  return csvText
    .trim()
    .split("\n")
    .map((row) => row.split(","));
};

// Helper function to extract the filename without extension
const extractFileName = (path: string): string => {
  const fileNameWithExtension = path.split("/").pop();
  return fileNameWithExtension?.split(".").slice(0, -1).join(".") || "";
};
