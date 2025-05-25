import { InputShape, Service } from "./serviceClass";

export type MarketingInput = {
  campaignName: string;
  budget: number;
};

class MarketingService extends Service<MarketingInput> {
  name = "marketingService";
  description =
    "Trigger this if the document appears to be a marketing campaign or strategy document.";
  inputShape: InputShape = {
    campaignName: "string",
    budget: "number",
  };
  protected execute = ({ campaignName, budget }: MarketingInput) => {
    const message = `Marketing Service chosen. Processing campaign ${campaignName} (budget: $${budget})...`;
    return message;
  };
}

export const marketingService = new MarketingService();
