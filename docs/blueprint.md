# **App Name**: K-Square Quotes

## Core Features:

- Google Authentication: Implement Google Sign-In for user authentication with splash screen redirection.
- Personalized Greeting: Display a personalized greeting (Bonjour/Bonsoir) based on the device's time in the header of the home screen, along with the user's Google profile picture/avatar and a motivational message.
- Settings and Preferences: Provide a settings screen to configure preferences such as quote notifications (every 3 hours), dark mode, and an 'About' section with developer and app information.
- Daily Quote: Display a different quote each day from the provided database, set on a customizable background image.
- Quote Themes: Categorize quotes into themes such as Excellence, Relationships, Spiritual Growth and Personal Development, with quotes from the database under each theme.
- Share and Like Quotes: Enable users to share quotes with the background image and K-Square signature on other social media platforms and save quotes as favorites.
- Recently Viewed Quotes: Implement a 'Recently Viewed' section to allow users to easily return to the last viewed quotes.
- Firebase Quote Refresh: Periodically refreshes quotes in the Firestore database based on the quote category (Excellence, Relationships, etc)

## Style Guidelines:

- Primary color: Deep blue (#293B5F) for a spiritual, trustworthy and calm feel.
- Background color: Light blue (#DDE6ED), a desaturated version of the primary color to complement deep blue and give off calm vibes
- Accent color: Soft lavender (#8E9AAF) to provide contrast
- Headline font: 'Playfair', serif font, to lend an elegant, high-end feel. Body font: 'PT Sans', sans-serif font, will support longer text, and is also humanist in style. Note: currently only Google Fonts are supported.
- Code font: 'Source Code Pro' for displaying configuration information. Note: currently only Google Fonts are supported.
- Use simple and elegant icons for sharing, liking, settings, and bottom navigation. Use the attached logo's design as the starting point for iconography.
- Professional layout with search bar in the header. Ensure clear sections for daily quotes, theme selections, and recently viewed quotes on the homepage. Use Bottom navigation for the 3 main sections of the app (Home, Favorites, Ask).
- Subtle animations when sharing or liking a quote and a smooth transition effect when moving from the splash screen to the home screen.