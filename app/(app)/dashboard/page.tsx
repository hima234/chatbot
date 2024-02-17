import { checkSignedIn } from "@/helpers/session";

export default async function Page() {
  const session = await checkSignedIn();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-primary">
      <h1 className="text-4xl font-bold text-center">
        You are not logged in as {session?.email}
      </h1>
    </div>
  );
}
