"use client";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { FormData } from "@/types/register/types";
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  return (
    <form>
      <div className="min-h-full flex justify-left container relative z-50 pb-0">
        <div className="w-full xl:max-w-xl space-y-8">
          <FormField
            type="text"
            placeholder="Имя профиля"
            name="name"
            register={register}
            error={errors.name}
          />
          <FormField
            type="text"
            placeholder="Контактный номер"
            name="phoneNumber"
            register={register}
            error={errors.phoneNumber}
          />
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
          />
          <FormField
            type="password"
            placeholder="Пароль"
            name="password"
            register={register}
            error={errors.password}
          />
          <FormField
            type="password"
            placeholder="Пароль"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
