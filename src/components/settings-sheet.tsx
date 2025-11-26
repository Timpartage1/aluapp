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
import { useAuth } from '@/firebase';
import { useState } from 'react';
import { handleRefreshQuotes } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';
import { useLocale } from '@/context/locale-provider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const auth = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLocale();

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await handleRefreshQuotes();
      toast({ title: t.refresh_success_title, description: t.refresh_success_desc });
    } catch (error) {
      toast({ variant: "destructive", title: t.refresh_error_title, description: t.refresh_error_desc });
    } finally {
      setIsRefreshing(false);
    }
  };

  const signOut = () => {
    auth.signOut();
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t.settings_title}</SheetTitle>
          <SheetDescription>
            {t.settings_description}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">{t.settings_dark_mode}</Label>
            <Switch 
              id="dark-mode" 
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="language">{t.settings_language}</Label>
            <Select value={locale} onValueChange={(value) => setLocale(value as 'en' | 'fr')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">{t.settings_notifications}</Label>
            <Switch id="notifications" />
          </div>
          
          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold">{t.settings_about_dev_title}</h3>
            <div className="text-sm text-muted-foreground font-code p-3 bg-muted rounded-md space-y-2">
              <p><strong>Dev:</strong> Provided by PICASF (www.picasf.com), by KAMATE KATENDE TIMOTHEE</p>
              <p><strong>{t.settings_about_app_title}:</strong> {t.settings_about_app_desc}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Button onClick={onRefresh} disabled={isRefreshing} className='w-full'>
              {isRefreshing ? t.refresh_button_loading : t.refresh_button}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">{t.refresh_description}</p>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" className="w-full" onClick={signOut}>
            {t.logout_button}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
