import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
import { extractTextFromFile } from "./extractTextFromFile";
import { LLMResult, promptLLM } from "./promptLLM";
import { financeService, FinanceInput } from "./services/financeService";
import { hrService, HRInput } from "./services/hrService";

const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript + Express!");
});

app.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "File missing" });
      return;
    }

    const documentText = await extractTextFromFile(req.file);

    const result: LLMResult = await promptLLM(documentText);

    if (result === "no_matching_service") {
      res
        .status(500)
        .json({ error: "Failed to provide service for document." });
      return;
    }

    let message;
    switch (result.service) {
      case "financeService":
        message = financeService.run(result.input as FinanceInput);
        break;
      case "hrService":
        message = hrService.run(result.input as HRInput);
        break;
    }

    res.status(200).json({
      documentName: req.file.originalname,
      serviceUsed: result.service,
      message: message,
    });
  } catch (err: any) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Failed to provide service for document." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
