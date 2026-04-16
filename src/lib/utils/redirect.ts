export function getSafeRedirect(
  redirectTo: string | null | undefined,
  fallback = "/",
) {
  if (!redirectTo) return fallback;

  try {
    const decoded = decodeURIComponent(redirectTo);

    if (!decoded.startsWith("/")) return fallback;

    if (decoded.startsWith("//")) return fallback;

    return decoded;
  } catch {
    return fallback;
  }
}
