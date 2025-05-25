import fs from "fs/promises";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

interface MulterFile {
  path: string;
  mimetype: string;
  // add other properties if needed
}

export async function extractTextFromFile(file: MulterFile): Promise<string> {
  const { path, mimetype } = file;
  const buffer = await fs.readFile(path);

  let fileType = "";
  if (mimetype.includes("pdf")) fileType = "pdf";
  else if (mimetype.includes("wordprocessingml.document")) fileType = "docx";
  else if (mimetype.includes("text")) fileType = "txt";
  else throw new Error(`Unsupported file mimetype: ${mimetype}`);

  switch (fileType) {
    case "pdf": {
      const data = await pdfParse(buffer);
      return data.text;
    }
    case "docx": {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    }
    case "txt": {
      return buffer.toString("utf-8");
    }
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
}
