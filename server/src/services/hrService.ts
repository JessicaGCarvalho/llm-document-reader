export type HrServiceInput = {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: number;
};

export function hrService({
  candidateName,
  candidateEmail,
  candidatePhone,
}: HrServiceInput) {
  const message = `HR Service chosen. Processing resume of ${candidateName} (email: ${candidateEmail}, phone: ${candidatePhone})...`;
  console.log(message);
  return message;
}
