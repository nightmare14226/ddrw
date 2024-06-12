"use client";
import { PhoneNumberProps } from "@/types/register/types";
const PhoneNumberField: React.FC<PhoneNumberProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  control,
  setValue,
  getValues,
  valueAsNumber,
}) => {
  const handleInput = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);
    console.log("value", value);
    let formattedValue = "";

    if (value.length > 0) {
      formattedValue += "+";
    }
    if (value.length == 1) {
      formattedValue += value[0];
    }
    if (value.length > 1) {
      formattedValue += value[0] + " ";
    }
    if (value.length > 1) {
      formattedValue += "(";
      if (value.length > 4) {
        formattedValue += value.substring(1, 4) + ") ";
      } else {
        formattedValue += value.substring(1);
      }
    }
    if (value.length > 4 && value.length <= 7) {
      formattedValue += value.substring(4);
    } else if (value.length > 4) {
      formattedValue += value.substring(4, 7) + "-";
      if (value.length > 7 && value.length <= 9) {
        formattedValue += value.substring(7);
      } else if (value.length > 9) {
        formattedValue += value.substring(7, 9) + "-";
        formattedValue += value.substring(9);
      }
    }

    e.target.value = formattedValue;
  };
  return (
    <div className="w-full relative">
      <div className="grow">
        {error ? (
          <>
            <input
              type={type}
              onInput={handleInput}
              placeholder={placeholder}
              className="bg-transparent border-b border-red-600 px-[10px] py-[10px] focus:ring-0 focus:outline-transparent focus:outline-none focus:border-b w-full mx-0 focus:ring-offset-0 mt-[20px]"
              {...register("phoneNumber", { required: true })}
            />
            <div className="help-message absolute h-[20px] bg-transparent text-red-600 px-2 text-[0.7rem] flex justify-center items-center focus:border-none py-0">
              {error.message}
            </div>
          </>
        ) : (
          <input
            type={type}
            onInput={handleInput}
            placeholder={placeholder}
            className="bg-transparent border-b border-slate-200 px-[10px] py-[10px] ring-0 focus:ring-0 focus:outline-transparent focus:outline-none focus:border-b w-full focus:ring-inset focus:ring-offset-0 mt-[20px] focus:border-b-green-400"
            {...register("phoneNumber", { required: true })}
          />
        )}
      </div>
    </div>
  );
};
export default PhoneNumberField;
