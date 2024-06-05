import {UseFormRegister, FieldError} from "react-hook-form"
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
  

  export type ValidFieldNames =
  | "name"
  | "phoneNumber"
  | "email"
  | "password"
  | "confirmPassword";

  export const RegisterSchema = z
  .object({
    email: z.string().email(),
    phoneNumber: z
      .string()
      .length(11),
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
  });

  export type RegisterSchemaType = z.infer<typeof RegisterSchema>;