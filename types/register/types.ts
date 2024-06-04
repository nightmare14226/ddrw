import {UseFormRegister, FieldError} from "react-hook-form"
export type FormData = {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
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