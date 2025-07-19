// This file is now deprecated. Navigation links are sourced from src/lib/content/header.ts
// and managed in Firestore. See src/components/layout/header.tsx for implementation.

export type NavLink = {
  id: string;
  href: string;
  label: string;
  subLinks?: NavLink[];
};
