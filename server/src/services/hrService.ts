import { InputShape, Service } from "./serviceClass";

export type HRInput = {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: number;
};

class HRService extends Service<HRInput> {
  name = "hrService";
  description = "Trigger this if the document appears to be an resume.";
  inputShape: InputShape = {
    candidateName: "string",
    candidateEmail: "string",
    candidatePhone: "number",
  };
  protected execute = ({
    candidateName,
    candidateEmail,
    candidatePhone,
  }: HRInput) => {
    const message = `HR Service chosen. Processing resume of ${candidateName} (email: ${candidateEmail}, phone: ${candidatePhone})...`;
    console.log(message);
    return message;
  };
}

export const hrService = new HRService();
