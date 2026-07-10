import { LoginForm } from "@/app/components/auth/login-form";
import { GlobalVideoHero } from "@/app/components/hero/GlobalVideoHero";

export default function LoginPage() {
  return (
    <>
      <GlobalVideoHero />
      <main className="-mt-20 px-4 pb-10 flex justify-center relative z-10">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </>
  );
}
