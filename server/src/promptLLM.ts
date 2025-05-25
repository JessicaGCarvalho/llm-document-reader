import { openai } from "./openai";
import { financeService } from "./services/financeService";
import { hrService } from "./services/hrService";
import { engService } from "./services/engService";
import { marketingService } from "./services/marketingService";
import { opService } from "./services/opService";

export type LLMResult =
  | {
      service: string;
      input: unknown;
    }
  | "no_matching_service";

export async function promptLLM(documentText: string): Promise<LLMResult> {
  const serviceList = [
    financeService,
    hrService,
    engService,
    marketingService,
    opService,
  ];
  const systemPrompt = `
    You are an intelligent document classification and extraction assistant. 
    Your task is to analyze a provided document and determine which of the available services it relates to. 
    If you identify a matching service, extract key information from the document relevant to that service and return a single JSON string in the correct format. 
    If there is no match, return the string "no_matching_service".

    Available Services and Output Formats:

    ${serviceList.map((service) => service.toPromptString()).join("\n")}

    Instructions:

    - Read the document thoroughly.  
    - Determine if it closely corresponds to one of the listed services.  
    - If it does, return a valid JSON string using the specified schema for that service.  
    - All fields must be extracted from the content. If a field is missing, make it null.  
    - If the document doesn't match any listed service, return exactly: "no_matching_service"

    Output:

    Only return the JSON string or "no_matching_service" with no extra commentary or explanation.
  `;

  const userPrompt = `Here is the document content:\n\n${documentText}`;

  const chatResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.0,
  });

  const result = chatResponse.choices[0]?.message?.content?.trim();

  if (!result) {
    throw new Error("LLM failed.");
  }

  if (result === "no_matching_service") return result;

  return JSON.parse(result);
}
