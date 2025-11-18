
"use client";

import { useEffect } from 'react';

const RECENTLY_VIEWED_KEY = 'k-square-recently-viewed';

interface ThemeViewTrackerProps {
  slug: string;
  title: string;
}

export function ThemeViewTracker({ slug, title }: ThemeViewTrackerProps) {
  useEffect(() => {
    try {
      const data = { slug, title };
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save recently viewed to localStorage", error);
    }
  }, [slug, title]);

  return null; // This component does not render anything
}
