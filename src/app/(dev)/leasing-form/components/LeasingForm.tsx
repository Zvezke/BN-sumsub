"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, z } from "zod";
import InputField from "@/components/InputField";
import axios from "axios";

const formSchema = z.object({
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  cvr: z.string().min(1, "CVR is required"),
  occupation: z.string().min(1, "Occupation is required"),
  housingCondition: z.string().min(1, "Housing Condition is required"),
  numberOfAdults: number().min(1, "Number of Adults is required"),
  postcode: z.string().min(1, "Postcode is required"),
  employmentStatus: z.string().min(1, "Employment Status is required"),
  maritalStatus: z.string().min(1, "Marital Status is required"),
  currentGrossSalary: number().min(1, "Current Gross Salary is required"),
  rkiRegistered: z.boolean(),
  lastYearIncome: number().min(1, "Last Year's Income is required"),
});

type FormInputs = z.infer<typeof formSchema>;

interface FormLeasingProps {}

const FormLeasing = ({}: FormLeasingProps) => {
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
    | "dateOfBirth"
    | "cvr"
    | "occupation"
    | "housingCondition"
    | "numberOfAdults"
    | "postcode"
    | "employmentStatus"
    | "maritalStatus"
    | "currentGrossSalary"
    | "rkiRegistered"
    | "lastYearIncome";

  interface InputField {
    label: string;
    id: FieldId;
    type: string;
  }

  const inputFields: InputField[] = [
    { label: "Date of birth", id: "dateOfBirth", type: "text" },
    { label: "CVR", id: "cvr", type: "text" },
    { label: "Occupation", id: "occupation", type: "text" },
    { label: "Housing condition", id: "housingCondition", type: "text" },
    { label: "Number of adults", id: "numberOfAdults", type: "number" },
    { label: "Postcode", id: "postcode", type: "text" },
    { label: "Employment status", id: "employmentStatus", type: "text" },
    { label: "Marital status", id: "maritalStatus", type: "text" },
    { label: "Current gross salary", id: "currentGrossSalary", type: "number" },
    { label: "RKI registered", id: "rkiRegistered", type: "checkbox" },
    { label: "Last year's income", id: "lastYearIncome", type: "number" },
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

      {/* This section displays any validation errors that occur during form submission. */}
      <button
        className="rounded bg-sand px-3 py-2 text-xs font-semibold text-himmel shadow-sm hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default FormLeasing;
