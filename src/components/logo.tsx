
import Image from 'next/image';
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      src="/ksqlogo.png"
      alt="K-Square Ministries Logo"
      width={162}
      height={48}
      className={cn("fill-current", className)}
      {...props}
      priority
    />
  );
}
