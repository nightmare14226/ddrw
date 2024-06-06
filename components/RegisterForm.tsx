"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "./FormField";
import { ArrowRightIcon, CornerUpLeft, LogOut } from "lucide-react";
import {
  FormData,
  RegisterSchemaType,
  RegisterSchema,
} from "@/types/register/types";
import Link from "next/link";
import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useModeStore } from "./StateProvider";
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });
  const changeTurboMode = useModeStore.use.changeTurboMode();
  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    changeTurboMode();
    console.log(data);
  };
  useEffect(() => {});
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="min-h-full flex justify-left container relative z-50 pb-0">
        <div className="w-full xl:max-w-xl space-y-8">
          <div className="grid grid-flow-row gap-10">
            <div className="flex w-full justify-center items-center xl:pb-8">
              <span>
                <CornerUpLeft />
              </span>
              <span className="font-ligh uppercase font-raleway text-xl text-gray-200 hidden md:block pb-0 pl-0 w-80">
                Регистрация
              </span>
              <div className="hidden md:block h-[0.01rem] w-full bg-regal-main/100"></div>
              <div className="block ml-5">
                <Link href="/passport">
                  <LogOut />
                </Link>
              </div>
            </div>
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
            <div className="flex w-full flex-col gap-10">
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
            </div>
            <button className="btn-out submit-button" type="submit">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              <p className="text-white text-left group-hover:text-white">
                Присоединиться
                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <ArrowRightIcon
                    className="h-5 w-5 text-white group-hover:text-white"
                    aria-hidden="true"
                  />
                </span>
              </p>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
