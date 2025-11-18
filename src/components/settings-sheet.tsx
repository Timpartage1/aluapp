
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth-provider';
import { useState } from 'react';
import { handleRefreshQuotes } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';


interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const { signOut } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await handleRefreshQuotes();
      toast({ title: "Success", description: "Quotes have been refreshed." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to refresh quotes." });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Manage your app preferences.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" disabled />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Quote Alerts (every 3 hours)</Label>
            <Switch id="notifications" />
          </div>
          
          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold">À Propos</h3>
            <div className="text-sm text-muted-foreground font-code p-3 bg-muted rounded-md space-y-2">
              <p><strong>Dev:</strong> Provided by PICASF (www.picasf.com), by KAMATE KATENDE TIMOTHEE</p>
              <p><strong>About the App:</strong> L’application contient les Quotes datant de 2018 à 2025. La nouvelle version est compatible avec les systèmes IOS, Android et Web. L’application est interactive et permet aux utilisateurs de poser des questions ou d’émettre des commentaires. Elle est utilisable hors ligne. Des mises à jour seront requises pour accéder aux nouvelles fonctionnalités et aux quotes récemment intégrés.</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Button onClick={onRefresh} disabled={isRefreshing} className='w-full'>
              {isRefreshing ? 'Refreshing...' : 'Refresh Quotes with AI'}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Periodically refreshes quotes in the Firestore database using GenAI.</p>
          </div>


        </div>
        <SheetFooter>
          <Button variant="outline" className="w-full" onClick={signOut}>
            Logout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
