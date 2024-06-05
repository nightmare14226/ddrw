import { FormFieldProps } from "@/types/register/types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    {error ? (
      <div className="w-full">
        <input
          type={type}
          placeholder={placeholder}
          className="bg-transparent border-b border-red-600 px-[10px] py-[10px] ring-0 focus:border-none"
          {...register(name, { valueAsNumber })}
        />
        <div className="absolute h-{1.2rem} bg-transparent text-red-600 px-2 text-[0.7rem] flex justify-center items-center focus:border-none">
          {error.message}
        </div>
      </div>
    ) : (
      <div className="w-full">
        <input
          type={type}
          placeholder={placeholder}
          className="bg-transparent ring-none border-b border-slate-600 px-[10px] py-[10px] ring-0 focus:ring-none focus:border-none"
          {...register(name, { valueAsNumber })}
        />
      </div>
    )}
  </>
);
export default FormField;
