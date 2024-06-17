"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "./FormField";
import { ArrowRightIcon, CornerUpLeft, LogOut } from "lucide-react";
import {
  AuthorizationSchemaType,
  AuthorizationSchema,
} from "@/types/register/types";
import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useModeStore } from "./StateProvider";
import { useRouter } from "next/navigation";
import { ProgressBarLink } from "./ProgressBar";

export default function AuthorizationForm() {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<AuthorizationSchemaType>({
    resolver: zodResolver(AuthorizationSchema),
    mode: "onChange",
  });
  const changeTurboMode = useModeStore.use.changeTurboMode();
  const router = useRouter();
  const onSubmit: SubmitHandler<AuthorizationSchemaType> = (data) => {
    // changeTurboMode();
    console.log(data);
  };
  const handleClick = useCallback(() => {
    // changeTurboMode();
  }, []);
  useEffect(() => {});
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="min-h-full flex justify-left container relative z-20 pb-0">
        <div className="w-full xl:max-w-xl space-y-8">
          <div className="grid grid-flow-row gap-10">
            <div className="flex w-full justify-center items-center xl:pb-8">
              <div onClick={handleClick} className="mr-5">
                <ProgressBarLink href="/register">
                  <span>
                    <CornerUpLeft />
                  </span>
                </ProgressBarLink>
              </div>
              <span className="font-light uppercase font-raleway text-xl text-gray-200 hidden md:block pb-0 pl-0 w-80 mr-5">
                Регистрация
              </span>
              <div className="block h-[0.01rem] w-full bg-regal-main/100 border-white border-b top-[-4px]"></div>
              <div className="block ml-5">
                <ProgressBarLink href="/register">
                  <LogOut />
                </ProgressBarLink>
              </div>
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
            </div>
            <button className="btn-out submit-button" type="submit">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              <p className="text-white text-left group-hover:text-white">
                присоединиться
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
