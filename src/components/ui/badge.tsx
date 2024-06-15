import React, { Component } from "react";

import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.BaseHTMLAttributes<HTMLSpanElement> {
  color?: string;
  children: React.ReactNode;
  size?: "default" | "sm";
  variant?: "default" | "outline" | "secondary" | "bordered";
  as?: React.ElementType;
}

const Badge = ({
  color = "blue",
  children,
  size = "sm",
  className,
  as = "span",
}: BadgeProps) => {
  return (
    <Typography
      as={as}
      variant="xs/medium"
      className={cn(
        "whitespace-nowrap rounded-md dark:opacity-90",
        {
          "px-3 py-1.5": size === "default",
          "px-2 py-1": size === "sm",
        },
        {
          "bg-green-100 text-green-800 dark:bg-green-100/80": color === "green",
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-100/80":
            color === "yellow",
          "bg-red-100 text-red-800 dark:bg-red-200/80": color === "red",
          "bg-primary-100/60 text-primary-500 dark:bg-primary-100/80":
            color === "blue",
          "bg-gray-100/90 text-gray-800 dark:bg-accent-hover/60 dark:text-foreground": color === "gray",
          "bg-white text-gray-800": color === "white",
          "border-gray-800/30 bg-gray-200 text-gray-500": color === "dark-gray",
        },
        className,
      )}
    >
      {children}
    </Typography>
  );
};

export { Badge };
