export function calculateTotalCost(av: number, months: number): number | null {
  // if (months <= 0) {
  //   return null;
  // }

  let factorRate: number;

  switch (months) {
    // case 1:
    //   factorRate = 100;
    //   break;
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

// Example usage
try {
  const acquisitionValue = 191481;
  const contractMonths = 48;
  const totalCost = calculateTotalCost(acquisitionValue, contractMonths);
  console.log(
    `Total Cost for an acquisition value of ${acquisitionValue} over ${contractMonths} months is: ${totalCost?.toFixed(2)}`,
  );
} catch (error) {
  const errorMessage = (error as Error).message;
  console.error(errorMessage);
}
