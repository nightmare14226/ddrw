"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "./FormField";
import {
  FormData,
  RegisterSchemaType,
  RegisterSchema,
} from "@/types/register/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });
  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) =>
    console.log(data);
  useEffect(() => {});
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="min-h-full flex justify-left container relative z-50 pb-0">
        <div className="w-full xl:max-w-xl space-y-8">
          <div className="grid grid-flow-row gap-10">
            <div className="flex flex-row gap-5 w-full">
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
            </div>
            <div className="w-full">
              <FormField
                type="email"
                placeholder="Email"
                name="email"
                register={register}
                error={errors.email}
              />
            </div>
            <div>
              <FormField
                type="password"
                placeholder="Пароль"
                name="password"
                register={register}
                error={errors.password}
              />
            </div>
            <div>
              <FormField
                type="password"
                placeholder="Пароль"
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword}
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
