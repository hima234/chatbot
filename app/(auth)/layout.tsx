import handleSession from "@/helpers/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await handleSession();

  if (session) redirect("/dashboard");

  return <div>{children}</div>;
}
