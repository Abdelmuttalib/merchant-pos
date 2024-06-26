import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn("px-4 md:px-6 lg:px-8 xl:px-10", className)}>{children}</div>;
}
