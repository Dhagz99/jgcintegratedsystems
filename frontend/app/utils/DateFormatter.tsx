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
