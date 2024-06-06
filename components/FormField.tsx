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
        <p className="py-2"></p>
        <input
          type={type}
          placeholder={placeholder}
          className="bg-transparent border-b border-red-600 px-[10px] py-[10px] focus:ring-0 focus:outline-transparent focus:outline-none focus:border-b w-full mx-0 focus:ring-offset-0"
          {...register(name, { valueAsNumber })}
        />
        <div className="help-message absolute h-{1.2rem} bg-transparent text-red-600 px-2 text-[0.7rem] flex justify-center items-center focus:border-none">
          {error.message}
        </div>
      </div>
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent border-b border-slate-600 px-[10px] py-[10px] ring-0 focus:ring-0 focus:outline-transparent focus:outline-none focus:border-b w-full focus:ring-inset focus:ring-offset-0"
        {...register(name, { valueAsNumber })}
      />
    )}
  </div>
);
export default FormField;
