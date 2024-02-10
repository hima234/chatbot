export function getSessionCookieName() {
  if (process.env.NODE_ENV === "production")
    return "__Secure-next-auth.session-token";
  else return "next-auth.session-token";
}
