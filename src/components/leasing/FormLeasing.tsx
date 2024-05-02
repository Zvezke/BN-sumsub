"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../InputField";
import axios from "axios";

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  postcode: z.string().min(1, "Postcode is required"),
  contractMonths: z.string().min(1, "Contract Months is required"),
  acquisitionValue: z.string().min(1, "Acquisition Value is required"),
});

type FormInputs = z.infer<typeof formSchema>;

interface FormLeasingProps {
  acquisitionValue: number | null;
  setAcquisitionValue: (acquisitionValue: number | null) => void;
  contractMonths: number;
  setContractMonths: (contractMonths: number) => void;
}

const FormLeasing = ({
  acquisitionValue,
  setAcquisitionValue,
  contractMonths,
  setContractMonths,
}: FormLeasingProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  // Function to handle form submission
  const onSubmit = async (data: FormInputs) => {
    try {
      const response = await axios.post("/api/test-email/", data);
    } catch (error) {
      console.error("Failed to send form data:", error);
    }
  };

  const className =
    "focus:shadow-outline-blue block w-full rounded bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 shadow focus:border-blue-300 focus:outline-none mb-4";

  type FieldId =
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "address"
    | "postcode"
    | "contractMonths"
    | "acquisitionValue";

  interface InputField {
    label: string;
    id: FieldId;
    type: string;
  }

  const inputFields: InputField[] = [
    { label: "First Name", id: "firstName", type: "text" },
    { label: "Last Name", id: "lastName", type: "text" },
    { label: "Email", id: "email", type: "email" },
    { label: "Phone", id: "phone", type: "tel" },
    { label: "Address", id: "address", type: "text" },
    { label: "Postcode", id: "postcode", type: "text" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputFields.map((field) => (
        <InputField
          key={field.id}
          label={field.label}
          id={field.id}
          type={field.type}
          register={register}
          validation={{ required: true }}
          className={className}
        />
      ))}

      {/* This section creates an input field for the acquisition value.
      It uses React Hook Form's `register` function to integrate the input into the form for validation and form state management.
      The `value` attribute is set to the current value of `acquisitionValue` in the parent component's state.
      The `onChange` handler updates both the React Hook Form internal state and the parent component's state (`setAcquisitionValue`) with the input value.*/}

      <label htmlFor="acquisitionValue" className="mb-2 block">
        {/* Danish: Anskaffelsessum */}
        Acquisition value
      </label>
      <input
        type="number"
        id="acquisitionValue"
        {...register("acquisitionValue", { required: true })}
        value={acquisitionValue !== null ? acquisitionValue : ""}
        onChange={(e) => {
          register("acquisitionValue").onChange(e);
          setAcquisitionValue(e.target.value ? Number(e.target.value) : null);
        }}
        className={className}
      />

      {/* This section creates a dropdown (select) input for choosing the lease period in months.
      It uses React Hook Form's `register` function to integrate the input into the form for validation and form state management.
      The `onChange` handler updates both the React Hook Form internal state and the parent component's state (`setContractMonths`) with the selected value. */}

      <label htmlFor="contractMonths" className="mb-2 block">
        {/* Danish: Leasingperiode i måneder */}
        Lease period in months
      </label>
      <select
        id="contractMonths"
        {...register("contractMonths", { required: true })}
        value={contractMonths}
        onChange={(e) => {
          register("contractMonths").onChange(e); // React Hook Form state update
          setContractMonths(Number(e.target.value)); // Parent state update
        }}
        className={className}
      >
        {[15, 24, 36, 48, 60].map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      {/* This section displays any validation errors that occur during form submission. */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormLeasing;
