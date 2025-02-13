import "@/styles/tailwind.scss";
import RegisterForm from "@/components/RegisterForm";
export default function RegisterPage() {
  return (
    <>
      <div className="w-full min-h-screen absolute inset-0">
        <div className=" w-full h-full z-10">
          <div className="flex relative flex-row bg-transparent h-full">
            <div className="mx-auto my-auto flex flex-row max-w-7xl">
              <div className="grid grid-flow-col gap-5">
                <div className="mx-auto grid grid-flow-row z-40 gap-5 my-auto lg:pr-[400px]">
                  <RegisterForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
