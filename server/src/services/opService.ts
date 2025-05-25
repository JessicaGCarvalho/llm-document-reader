import { InputShape, Service } from "./serviceClass";

export type OpInput = {
  date: string;
};

class OpService extends Service<OpInput> {
  name = "opService";
  description = "Trigger this if the document appears to be meeting minutes.";
  inputShape: InputShape = {
    date: "string",
  };
  protected execute = ({ date }: OpInput) => {
    const message = `Operations Service chosen. Processing date: ${date}...`;
    return message;
  };
}

export const opService = new OpService();
