import { FormFieldProps } from "@/types/register/types";
const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <div className="w-full relative">
    {error ? (
      <div className="grow">
        <input
          type={type}
          placeholder={placeholder}
          className="bg-transparent border-b border-red-600 px-[10px] py-[10px] focus:ring-0 focus:outline-transparent focus:outline-none focus:border-b w-full mx-0 focus:ring-offset-0 mt-[20px]"
          {...register(name, { valueAsNumber })}
        />
        <div className="help-message absolute h-[20px] bg-transparent text-red-600 px-2 text-[0.7rem] flex justify-center items-center focus:border-none py-0">
          {error.message}
        </div>
      </div>
    ) : (
      <div className="grow">
        <input
          type={type}
          placeholder={placeholder}
          className="bg-transparent border-b border-slate-200 px-[10px] py-[10px] ring-0 focus:ring-0 focus:outline-transparent focus:outline-none focus:border-b w-full focus:ring-inset focus:ring-offset-0 mt-[20px] focus:border-b-green-400"
          {...register(name, { valueAsNumber })}
        />
      </div>
    )}
  </div>
);
export default FormField;
