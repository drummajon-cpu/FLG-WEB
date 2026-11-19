import { notFound } from "next/navigation";

// With one root layout per language there is no global not-found page, so any address
// no other route matches lands here and is answered with app/(en)/not-found.tsx (a
// real 404 status, inside the site's own layout).
export default function CatchAll() {
  notFound();
}
