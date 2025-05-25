export type FinanceServiceInput = {
  invoiceAmount: number;
};

export function financeService({ invoiceAmount }: FinanceServiceInput) {
  const message = `Finance Service chosen. Processing invoice of $${invoiceAmount}...`;
  console.log(message);
  return message;
}
