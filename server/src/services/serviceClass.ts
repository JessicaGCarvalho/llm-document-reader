export type DataType = "string" | "number";
export type InputShape = Record<string, DataType>;

export abstract class Service<
  TInput extends Record<string, unknown> = Record<string, unknown>
> {
  abstract name: string;
  abstract description: string;
  abstract inputShape: InputShape;
  protected abstract execute: (input: TInput) => string;

  run(input: TInput) {
    const isInputTypeValid = this.isValidInputType(input);
    if (!isInputTypeValid)
      return { success: false, message: "Input shape invalid" };

    return this.execute(input);
  }

  toPromptString() {
    return `
        ${this.name} - ${this.description}
        Output format:  
        {"service": "${this.name}", "input": ${JSON.stringify(
      this.inputShape,
      null,
      2
    )}}
`;
  }

  isValidInputType(input: TInput): boolean {
    console.log(input);
    for (const key in this.inputShape) {
      const expectedType = this.inputShape[key];
      const value = input[key];
      if (
        value !== null &&
        ((expectedType === "string" && typeof value !== "string") ||
          (expectedType === "number" && typeof value !== "number"))
      ) {
        return false;
      }
    }
    return true;
  }
}
