"use client";

import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "@/components/InputField";

// Define your schema using Zod
const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  postcode: z.string().min(1, "Postcode is required"),
  contractMonths: z.number().int().min(1, "Contract Months is required"),
  acquisitionValue: z.number().int().min(1, "Acquisition Value is required"),
});

// Infer the type from the schema
type FormInputs = z.infer<typeof formSchema>;

interface FormLeasingProps {
  // acquisitionValue: number | null;
  // setAcquisitionValue: (acquisitionValue: number | null) => void;
  // contractMonths: number;
  // setContractMonths: (contractMonths: number) => void;
  // setLeasing: (leasing: any) => void;
}

const FormLeasing = (
  {
    // acquisitionValue,
    // setAcquisitionValue,
    // contractMonths,
    // setContractMonths,
  }: FormLeasingProps,
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema), // Use Zod for validation
  });

  const onSubmit = (data: FormInputs) => {
    // setLeasing((prev: FormInputs) => ({ ...prev, ...data }));
    console.log(data);
  };

  const className =
    "focus:shadow-outline-blue block w-full rounded bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 shadow focus:border-blue-300 focus:outline-none mb-4";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <InputField
        label="First Name"
        id="firstName"
        type="text"
        register={() => register("firstName")}
        validation={{ required: true }}
        className={className}
      /> */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium leading-6 text-white"
        >
          First Name
        </label>
        <div className="mt-2">
          <input
            id="firstName"
            type="text"
            {...register("firstName", { required: true })}
            className={className}
          />
        </div>
      </div>
      {/* <InputField
        label="Last Name"
        id="lastName"
        type="text"
        register={register}
        validation={{ required: true }}
        className={className}
      />
      <InputField
        label="Email"
        id="email"
        type="email"
        register={register}
        validation={{ required: true }}
        className={className}
      />
      <InputField
        label="Phone"
        id="phone"
        type="tel"
        register={register}
        validation={{ required: true }}
        className={className}
      />
      <InputField
        label="Address"
        id="address"
        type="text"
        register={register}
        validation={{ required: true }}
        className={className}
      />
      <InputField
        label="Postcode"
        id="postcode"
        type="text"
        register={register}
        validation={{ required: true }}
        className={className}
      /> */}

      <button className="rounded bg-sand px-4 py-2 text-sm font-medium text-himmel">
        Submit
      </button>
    </form>
  );
};

export default FormLeasing;

// <label htmlFor="acquisitionValue" className="mb-2 block">
// {/* Danish: Anskaffelsessum */}
// Acquisition value
// </label>
// <input
// type="number"
// id="acquisitionValue"
// value={acquisitionValue !== null ? acquisitionValue : ""}
// onChange={(e) =>
//   setAcquisitionValue(e.target.value ? Number(e.target.value) : null)
// }
// className="focus:shadow-outline-blue block w-full rounded bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 shadow focus:border-blue-300 focus:outline-none"
// {...register("acquisitionValue", { required: true })}
// />
// <label htmlFor="contractMonths" className="mb-2 block">
// {/* Danish: Leasingperiode i måneder */}
// Lease period in months
// </label>
// <select
// id="contractMonths"
// value={contractMonths}
// onChange={(e) => setContractMonths(Number(e.target.value))}
// className="focus:shadow-outline-blue block w-full rounded bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 shadow focus:border-blue-300 focus:outline-none"
// {...register("contractMonths", { required: true })}
// >
// <option value="15">15</option>
// <option value="24">24</option>
// <option value="36">36</option>
// <option value="48">48</option>
// <option value="60">60</option>
// </select>
