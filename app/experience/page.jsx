"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy URL — Hebi home is now `/`. */
export default function ExperienceRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}
