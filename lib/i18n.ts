// Two languages: English at the root, Spanish under /es. Careers, the SMS terms and
// the parts inventory exist in English only.
export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];

/** Prefix a root-relative path ("/services", "/#contact") for the given language. */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  if (path === "/") return "/es";
  if (path.startsWith("/#")) return `/es${path.slice(1)}`;
  return `/es${path}`;
}
