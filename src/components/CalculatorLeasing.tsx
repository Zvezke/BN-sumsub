"use client";

import React, { useState, useEffect } from "react";
import { calculateTotalCost } from "@/utils/functions/calculator-leasing";

const CalculatorLeasing = () => {
  const [acquisitionValue, setAcquisitionValue] = useState<number | null>(null);
  const [contractMonths, setContractMonths] = useState(15);
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
    <main className="flex min-h-screen flex-col justify-center bg-[url('/images/bg_dummy.png')] p-4">
      <div className="ml-[5%] gap-8 text-neutral-200 lg:ml-[27.5vw] lg:flex lg:items-end">
        <div>
          <label htmlFor="acquisitionValue" className="mb-2 block">
            {/* Danish: Anskaffelsessum */}
            Acquisition value
          </label>
          <input
            type="number"
            id="acquisitionValue"
            value={acquisitionValue !== null ? acquisitionValue : ""}
            onChange={(e) =>
              setAcquisitionValue(
                e.target.value ? Number(e.target.value) : null,
              )
            }
            className="mb-4 rounded-sm p-2 text-gray-900"
          />
          <label htmlFor="contractMonths" className="mb-2 block">
            {/* Danish: Leasingperiode i måneder */}
            Lease period in months
          </label>
          <select
            id="contractMonths"
            value={contractMonths}
            onChange={(e) => setContractMonths(Number(e.target.value))}
            className="mb-4 rounded-sm p-2 text-gray-900"
          >
            <option value="15">15</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
            <option value="60">60</option>
          </select>
        </div>
        <div className="text-xl">
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
      </div>
    </main>
  );
};

export default CalculatorLeasing;
