import React from "react";
import clsx from "clsx";

// Basic shadcn/ui style Button
export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-blue-600 text-white hover:bg-blue-700": variant === "default",
            "border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white": variant === "outline",
            "px-8 py-3 text-lg": size === "lg",
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-2.5": size === "default",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";