import {UseFormRegister, FieldError, Control, UseFormGetValues, UseFormSetValue} from "react-hook-form"
import { z, ZodType } from "zod";
 
export type FormData = {
    name?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
  };
  
  export type PhoneNumberProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    control: Control;
    setValue: UseFormSetValue<FormData>;
    getValues: UseFormGetValues<FormData>;
    valueAsNumber?: boolean;
  };

  export type ValidFieldNames =
  | "name"
  | "phoneNumber"
  | "email"
  | "password"
  | "confirmPassword";

  export const RegisterSchema = z
  .object({
    email: z.string().email(),
    phoneNumber: z.string(),
    name: z
      .string()
      .min(1, { message: "This field is required"}),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  } )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  })
  .refine((data) => /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(data.phoneNumber),
{
  message: "Invalid phone number format.",
  path: ["phoneNumber"],
});
  

  export type RegisterSchemaType = z.infer<typeof RegisterSchema>;