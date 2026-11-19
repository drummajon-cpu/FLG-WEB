"use client";

import { MotionConfig } from "framer-motion";

// framer-motion does not read the prefers-reduced-motion rule in globals.css. With
// reducedMotion="user", every motion component under this provider drops its
// transform and layout animation for visitors who ask for reduced motion, and keeps
// only opacity. It wraps the pages that use framer-motion (home and careers) and not
// the root layout, so the service pages never download framer-motion at all.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
