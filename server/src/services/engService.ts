import { InputShape, Service } from "./serviceClass";

export type EngInput = {
  techStack: string;
};

class EngService extends Service<EngInput> {
  name = "engService";
  description =
    "Trigger this if the document appears to be a project proposal or technical specification.";
  inputShape: InputShape = {
    techStack: "string",
  };
  protected execute = ({ techStack }: EngInput) => {
    const message = `Engineering Service chosen. Processing tech stack: ${techStack}...`;
    return message;
  };
}

export const engService = new EngService();
