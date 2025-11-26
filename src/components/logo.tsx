
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className={cn("h-12 w-12 fill-current", className)}
        {...props}
      >
        <path d="M43.6,23.8H11.2c-2.3,0-4.2,1.9-4.2,4.2v43.9c0,2.3,1.9,4.2,4.2,4.2h32.4c2.3,0,4.2-1.9,4.2-4.2V28.1C47.8,25.7,46,23.8,43.6,23.8z M35,62.8h-9.2V49h9.2V62.8z M35,44.8h-9.2v-9h9.2V44.8z M32,31.7l-7.2,8.4H18.3l9.5-10.9l-9-10.7h6.6l7.2,8.2V31.7z"/>
        <path d="M40.3,16.8l-4.2-2.3c-1.6-0.9-3.6-0.9-5.2,0L7.1,24.1c-1.6,0.9-2.7,2.6-2.7,4.5v43.9c0,1.9,1,3.6,2.7,4.5l23.8,13.8c1.6,0.9,3.6,0.9,5.2,0l23.8-13.8c1.6-0.9,2.7-2.6,2.7-4.5V28.5c0-1.9-1-3.6-2.7-4.5L40.3,16.8z M56.8,63.2c0,1.9-1.2,3.6-3,4.3L30,81.3c-1.8,1-4.1,1-5.9,0L0.2,67.5c-1.8-1-3-2.8-3-4.8V28.7c0-2,1.2-3.8,3-4.8l23.8-13.8c1.8-1,4.1-1,5.9,0l23.8,13.8c1.8,1,3,2.8,3,4.8V63.2z"/>
      </svg>
      <div className="flex flex-col">
          <span className="font-headline text-xl font-bold leading-none">K-SQUARE</span>
          <span className="text-sm font-semibold tracking-widest text-muted-foreground">MINISTRIES</span>
      </div>
    </div>
  );
}
