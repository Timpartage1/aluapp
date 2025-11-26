
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={cn("h-12 w-12 fill-current", className)}
        {...props}
      >
        <path d="M19.94,5.43a2,2,0,0,0-1.07-.56l-6.84-2.26a2,2,0,0,0-1.22,0L3.92,4.87a2,2,0,0,0-1.07.56,2,2,0,0,0-.56,1.07L2,13.34a2,2,0,0,0,.56,1.07l6.84,6.84a2,2,0,0,0,1.07.56l6.84,0a2,2,0,0,0,1.07-.56l3.42-3.42a2,2,0,0,0,.56-1.07l1.14-6.84a2,2,0,0,0-.56-1.07Zm-6.31,8.35L11.7,11.85,9.77,13.78,8.81,12.82l1.93-1.93L8.81,9,9.77,8.07l1.93,1.93L13.63,8.07l.95.95L12.66,11l1.93,1.93Z" />
      </svg>
      <span className="font-headline text-3xl font-bold">
        Quotes
      </span>
    </div>
  );
}
