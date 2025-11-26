
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-4">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 162 48"
        className={cn("h-12 w-auto fill-current", className)}
        {...props}
      >
        <path d="M38.1 0H9.9C4.4 0 0 4.4 0 9.9v28.2C0 43.6 4.4 48 9.9 48h28.2c5.5 0 9.9-4.4 9.9-9.9V9.9C48 4.4 43.6 0 38.1 0zM26.2 30.5l-8.5 8.5h-5l8.5-8.5-8.5-8.5h5l8.5 8.5zM34.8 21.3l-5.6 5.6-2.9-2.9 5.6-5.6 2.9 2.9zm-8.6-1.2l-5.6-5.6h5l5.6 5.6h-5z"/>
        <text x="58" y="20" fontFamily="sans-serif" fontSize="18" fill="currentColor">K-SQUARE</text>
        <text x="58" y="42" fontFamily="sans-serif" fontSize="18" fill="currentColor">MINISTRIES</text>
      </svg>
    </div>
  );
}
