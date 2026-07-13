import Link from "next/link";
import { BarChart3, Mail, Package } from "lucide-react";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { db } from "@/server";
import { products, users } from "@/server/schema";
import { routing } from "@/i18n/routing";
import { redirect } from "next/navigation";
import { ProductForm } from "@/app/components/dashboard/product-form";
import { reserve } from "@/server/schema";
import { CreatedProductsList } from "@/app/components/dashboard/created-products-list";


type DashboardPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ view?: string; productId?: string }>;
};

export default async function DashboardPage({
  params,
  searchParams,
}: DashboardPageProps) {
  const { locale } = await params;
  const { view, productId } = await searchParams;
  const currentView =
    view === "created" ? "created" : view === "messages" ? "messages" : "product";

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect(`/${locale}`);
  }

  const user = db
    ? await db.query.users.findFirst({
        where: eq(users.email, email),
      })
    : null;

  if (user?.role !== "admin") {
    redirect(`/${locale}`);
  }

  const createdProducts =
    currentView === "created" && db
      ? await db.select().from(products)
      : [];

  const reserveMessages =
    currentView === "messages" && db
      ? await db.select().from(reserve)
      : [];

  let editingProduct = null;
  if (productId && currentView === "product" && db) {
    const result = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });
    editingProduct = result || null;
  }

  return (
   
      <section className="mt-35 mb-10">
         <div className="flex px-10">
            <div className="flex flex-col gap-6 text-red-500 border-r-red-500 border-r-2 pr-10">
            <Link
              href={`/${locale}/dashboard?view=product`}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${
                currentView === "product"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "text-red-600 hover:bg-red-50 hover:text-red-700"
              }`}
            >
              Product
                 <Package className="size-4" />
            </Link>
            <Link
              href={`/${locale}/dashboard?view=created`}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${
                currentView === "created"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "text-red-600 hover:bg-red-50 hover:text-red-700"
              }`}
            >
              Created  <BarChart3 className="size-4" />
            </Link>
            <Link
              href={`/${locale}/dashboard?view=messages`}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 ${
                currentView === "messages"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "text-red-600 hover:bg-red-50 hover:text-red-700"
              }`}
            >
              Messages <Mail className="size-4" />
            </Link>
            </div>
            <div className="w-full pl-10">
              {currentView === "created" ? (
                <div className="rounded-lg border border-red-100 bg-white p-5">
                  <h2 className="mb-4 text-xl font-semibold text-red-600">
                    Created Products
                  </h2>
                  <CreatedProductsList products={createdProducts} locale={locale} />
                </div>
              ) : currentView === "messages" ? (
                <div className="rounded-lg border border-red-100 bg-white p-5">
                  <h2 className="mb-4 text-xl font-semibold text-red-600">
                    Messages
                  </h2>

                  {reserveMessages.length ? (
                    <div className="grid gap-4">
                      {reserveMessages.map((message) => (
                        <div
                          key={message.id}
                          className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                        >
                          <p className="font-semibold text-slate-900">
                            {message.name} {message.lastname}
                          </p>
                          <p className="text-sm text-slate-600">
                            {message.email} · {message.phone}
                          </p>
                          <p className="mt-2 text-sm text-slate-700">
                            {message.model} — {message.service}
                          </p>
                          <p className="text-sm text-slate-600">
                            {message.day}, {message.month} at {message.hour}
                          </p>
                          <p className="text-sm text-slate-600">
                            Car year: {message.carYear}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">No reserve messages yet.</p>
                  )}
                </div>
              ) : (
                <ProductForm
                  locale={locale as "en" | "ka" | "ru"}
                  productId={productId}
                  existingProduct={editingProduct || undefined}
                />
              )}
            </div>
         </div>
        </section>

  );
}