export function calculateTotalCost(av: number, months: number): number | null {
  let factorRate: number;

  switch (months) {
    case 15:
      factorRate = 7.1;
      break;
    case 24:
      factorRate = 4.58;
      break;
    case 36:
      factorRate = 3.15;
      break;
    case 48:
      factorRate = 2.52;
      break;
    case 60:
      factorRate = 1.995;
      break;
    case null:
      throw new Error("Please enter a contract term.");
    default:
      throw new Error(
        "Unsupported contract term. Please enter 15, 24, 36, 48, or 60 months.",
      );
  }

  return av * (factorRate / 100);
}
