"use client";

import React, { useState, useEffect } from "react";
import { calculateTotalCost } from "@/lib/utils";

export default function Home() {
  const [acquisitionValue, setAcquisitionValue] = useState<number | null>(null);
  const [contractMonths, setContractMonths] = useState(15);
  const [totalCost, setTotalCost] = useState<number | null>(null);

  useEffect(() => {
    // Ensure calculateTotalCost can handle null as an argument
    if (acquisitionValue !== null) {
      const calculatedTotalCost = calculateTotalCost(
        acquisitionValue,
        contractMonths,
      );
      setTotalCost(calculatedTotalCost);
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
    <main className="flex min-h-screen flex-col justify-center bg-neutral-900 p-4">
      <div className="ml-[5%] gap-8 text-neutral-200 lg:ml-[27.5vw] lg:flex lg:items-end">
        <div>
          <label htmlFor="acquisitionValue" className="mb-2 block">
            Anskaffelsessum
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
            Leasingperiode i måneder
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
            Anskaffelsessum:{" "}
            <span className="font-bold">
              {formattedAcquisitionValue
                ? `${formattedAcquisitionValue} kr.`
                : ""}
            </span>
          </p>
          <p>
            Leasingperiode: <span className="font-bold">{contractMonths}</span>{" "}
            måneder.
          </p>
          <p>
            Den forventede månedlige ydelse (ekskl. moms):{" "}
            <span className="font-bold">
              {formattedAcquisitionValue ? `${formattedTotalCost} kr.` : ""}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
