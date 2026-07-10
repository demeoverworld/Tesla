import { redirect } from "next/navigation";

type LocaleLoginRedirectPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleLoginRedirectPage({
  params,
}: LocaleLoginRedirectPageProps) {
  const { locale } = await params;
  redirect(`/${locale}/auth/login`);
}
