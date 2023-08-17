"use client";

import React, { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormSubmitBtnProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

// Create custom button that will take props children type React.ReactNode and optional className type string
const FormSubmitBtn = ({
  children,
  className,
  ...props // will catch any other props that is explicitely added
}: FormSubmitBtnProps) => {
  // pending while loading
  const { pending } = useFormStatus();
  return (
    <button
      {...props} // will catch any other props that is explicitely added
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={pending} // disable while loading
    >
      {/* if loading is true, loading... (in the button) */}
      {pending && <span className="loading loading-ring loading-md" />}
      {children}
    </button>
  );
};

export default FormSubmitBtn;
