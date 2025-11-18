import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      className={cn("fill-current", className)}
      {...props}
    >
      <path d="M22.5 45.4L37.8 25 22.5 4.6h10.9L48.8 25l-15.4 20.4H22.5z M0 45.4V4.6h31.2v9.1H10.9v6.5h18.8v9.1H10.9v7.1h20.3v9z" />
      <rect x="58" y="0" width="50" height="50" rx="5" />
      <text x="118" y="34" fontFamily="Playfair Display, serif" fontSize="28" fontWeight="bold">
        Quotes
      </text>
    </svg>
  );
}
