import { RegisterForm } from "@/app/components/auth/register-form";
import { GlobalVideoHero } from "@/app/components/hero/GlobalVideoHero";


export default function RegisterPage() {
   return (
      <>
         <GlobalVideoHero />
         <main className="-mt-20 px-4 pb-10 flex justify-center relative z-10">
            <div className="w-full max-w-md">
               <RegisterForm />
            </div>
         </main>
      </>
   )
}