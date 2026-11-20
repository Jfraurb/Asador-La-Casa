import type { ReactNode } from "react";

export function Campo({ name, label, error, children, opcional, className = "" }: { name: string; label: string; error?: string; children: ReactNode; opcional?: boolean; className?: string }) {
  return (
    <div className={`campo ${className}`}>
      <label htmlFor={`f-${name}`}>
        {label} {opcional ? <span className="font-normal text-carbon-500">(opcional)</span> : <span className="text-granate" aria-hidden="true">*</span>}
      </label>
      {children}
      {error ? <p id={`e-${name}`} className="error">{error}</p> : null}
    </div>
  );
}

/** Campo trampa para bots: invisible para personas y lectores de pantalla. */
export function Trampa() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="f-web">No rellenes este campo</label>
      <input id="f-web" type="text" name="web" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
