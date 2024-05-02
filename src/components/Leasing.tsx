"use client";

import { useState } from "react";
import FormLeasing from "./leasing/FormLeasing";
import CalculatorLeasing from "./leasing/CalculatorLeasing";

const Leasing = () => {
  const [acquisitionValue, setAcquisitionValue] = useState<number | null>(null);
  const [contractMonths, setContractMonths] = useState(15);

  return (
    <>
      <div className="mt-16 grid h-full grow grid-cols-2 justify-items-center">
        <div className="col-start-1 w-4/6 text-neutral-200">
          <FormLeasing
            acquisitionValue={acquisitionValue}
            setAcquisitionValue={setAcquisitionValue}
            contractMonths={contractMonths}
            setContractMonths={setContractMonths}
          />
        </div>
        <div className="col-start-2 text-neutral-200">
          <CalculatorLeasing
            acquisitionValue={acquisitionValue}
            contractMonths={contractMonths}
          />
        </div>
      </div>
    </>
  );
};

export default Leasing;
