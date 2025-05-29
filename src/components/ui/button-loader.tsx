import { cn } from "@/lib/tailwind-class";
import { Loader2 } from "lucide-react";

type ButtonLoaderProps = React.ComponentPropsWithoutRef<typeof Loader2>;

export default function ButtonLoader({
  className,
  ...props
}: ButtonLoaderProps) {
  return (
    <Loader2
      className={cn(
        "animate-spin opacity-0 transition-opacity group-disabled/button:opacity-100",
        className,
      )}
      {...props}
    />
  );
}
