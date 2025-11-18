import { AuthGuard } from "@/components/auth-guard";
import { AppShell } from "@/components/app-shell";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AppShell>
        <Suspense>{children}</Suspense>
      </AppShell>
    </AuthGuard>
  );
}
