import React from "react";

type FormattedDateProps = {
  value?: string | Date | null;
  locale?: string;
};

export const FormattedDate: React.FC<FormattedDateProps> = ({
  value,
  locale = "en-US",
}) => {
  if (!value) return null;

  const date = new Date(value);
  const formatted = date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <span>{formatted}</span>;
};



export function parseISODateOnly(iso: string): Date | null {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;

  const year = Number(m[1]);
  const month1to12 = Number(m[2]); // 1..12
  const day = Number(m[3]);

  if (month1to12 < 1 || month1to12 > 12) return null;

  return new Date(Date.UTC(year, month1to12 - 1, day)); // <-- subtract 1
}

/**
 * Format to "August 18, 2025".
 */
export function formatLongDate(
  input: string | Date | null | undefined,
  locale = "en-US"
): string {
  if (!input) return "";
  const date =
    typeof input === "string" ? parseISODateOnly(input) : input instanceof Date ? input : null;
  if (!date || isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // keep calendar day stable
  }).format(date);
}
