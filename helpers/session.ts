import db from "@/database";
import { users, sessions } from "@/database/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextResponse } from "next/server";
import { getSessionCookieName } from "@/helpers/token";
import { cookies } from "next/headers";

export default async function handleSession() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return null;

    const profile = await db.query.users.findFirst({
      where: eq(users.email, session.users?.email!),
    });

    if (!profile) return null;

    if (profile.isDeleted) {
      const cookieStore = cookies();

      const sesstionToken = cookieStore.get(getSessionCookieName());

      if (!sesstionToken?.value)
        return NextResponse.json({
          success: false,
          message: "You are not logged in",
        });

      await db
        .delete(sessions)
        .where(eq(sessions.sessionToken, sesstionToken?.value))
        .returning();

      return null;
    }

    return profile;
  } catch (error) {
    return null;
  }
}
