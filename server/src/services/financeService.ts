import { InputShape, Service } from "./serviceClass";

export type FinanceInput = { invoiceAmount: number };

class FinanceService extends Service<FinanceInput> {
  name = "financeService";
  description = "Trigger this if the document appears to be an invoice.";
  inputShape: InputShape = { invoiceAmount: "number" };
  protected execute = ({ invoiceAmount }: FinanceInput) => {
    const message = `Finance Service chosen. Processing invoice of $${invoiceAmount}...`;
    console.log(message);
    return message;
  };
}

export const financeService = new FinanceService();
