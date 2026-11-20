export const CONSENT_KEY = "botica-consent-v1";
export const CONSENT_EVENT = "botica:consent";
export const OPEN_SETTINGS_EVENT = "botica:open-cookie-settings";
export type Consent = { analytics: boolean; date: string };

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}
export function saveConsent(analytics: boolean) {
  const c: Consent = { analytics, date: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  } catch {}
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
}
