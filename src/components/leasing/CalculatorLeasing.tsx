"use client";

import React, { useState, useEffect } from "react";
import { calculateTotalCost } from "@/utils/functions/calculator-leasing";

interface CalculatorLeasingProps {
  acquisitionValue: number | null;
  contractMonths: number;
}

const CalculatorLeasing = ({
  acquisitionValue,
  contractMonths,
}: CalculatorLeasingProps) => {
  const [totalCost, setTotalCost] = useState<number | null>(null);

  useEffect(() => {
    // Ensure calculateTotalCost can handle null as an argument
    if (acquisitionValue !== null) {
      try {
        const calculatedTotalCost = calculateTotalCost(
          acquisitionValue,
          contractMonths,
        );
        setTotalCost(calculatedTotalCost);
      } catch (error) {
        const errorMessage = (error as Error).message;
        console.error(errorMessage);
      }
    }
  }, [acquisitionValue, contractMonths]);

  // Format acquisitionValue for display
  const formattedAcquisitionValue =
    acquisitionValue !== null
      ? new Intl.NumberFormat("da-DK", { minimumFractionDigits: 0 }).format(
          acquisitionValue,
        ) + ",-"
      : "";

  // Format totalCost with 'da-DK' locale, checking for decimals
  let formattedTotalCost =
    totalCost !== null
      ? new Intl.NumberFormat("da-DK", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(totalCost)
      : "";

  formattedTotalCost = formattedTotalCost.endsWith(",00")
    ? formattedTotalCost.slice(0, -3) + ",-"
    : formattedTotalCost;

  return (
    <>
      <div className="row-start-2 text-xl">
        <p>
          {/* Danish: Anskaffelsessum: */}
          Acquisition value, DKK:
          <span className="font-bold">
            {formattedAcquisitionValue ? ` ${formattedAcquisitionValue}` : ""}
          </span>
        </p>
        <p>
          {/* Danish: Leasingperiode: */}
          Lease period:
          <span className="font-bold"> {contractMonths}</span> months.
        </p>
        <p>
          {/* Danish: Den forventede månedlige ydelse (ekskl. moms): */}
          The expected monthly payment (excluding VAT), DKK.:
          <span className="font-bold">
            {formattedAcquisitionValue ? ` ${formattedTotalCost}` : ""}
          </span>
        </p>
      </div>
    </>
  );
};

export default CalculatorLeasing;
