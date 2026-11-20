"use client";
import { OPEN_SETTINGS_EVENT } from "@/lib/consent";

export default function CookieSettingsButton() {
  if (!process.env.NEXT_PUBLIC_GA_ID) return null;
  return (
    <button type="button" className="hover:text-oro" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}>
      Configurar cookies
    </button>
  );
}
