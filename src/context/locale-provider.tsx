"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of your translation strings
interface Translations {
  nav_home: string;
  nav_favorites: string;
  nav_resources: string;
  nav_feedback: string;
  nav_about: string;
  nav_search: string;
  search_title: string;
  greeting_morning: string;
  greeting_evening: string;
  headline: string;
  settings_title: string;
  settings_description: string;
  settings_dark_mode: string;
  settings_language: string;
  settings_notifications: string;
  settings_about_dev_title: string;
  settings_about_app_title: string;
  settings_about_app_desc: string;
  refresh_button: string;
  refresh_button_loading: string;
  refresh_description: string;
  refresh_success_title: string;
  refresh_success_desc: string;
  refresh_error_title: string;
  refresh_error_desc: string;
  logout_button: string;
  resources_title: string;
  resources_intro: string;
  resources_book_title: string;
  resources_book_desc: string;
  resources_book_button: string;
  feedback_title: string;
  feedback_description: string;
  feedback_form_name: string;
  feedback_form_email: string;
  feedback_form_message: string;
  feedback_form_submit: string;
  feedback_form_submitting: string;
  feedback_success_title: string;
  feedback_success_desc: string;
  feedback_error_title: string;
  feedback_error_desc: string;
}

// Create translation objects for each language
const fr: Translations = {
  nav_home: 'Accueil',
  nav_favorites: 'Favoris',
  nav_resources: 'Ressources',
  nav_feedback: 'Feedback',
  nav_about: 'À propos',
  nav_search: 'Rechercher',
  search_title: 'Rechercher des citations',
  greeting_morning: 'Bonjour,',
  greeting_evening: 'Bonsoir,',
  headline: 'Passez votre journée avec des moments inspirés',
  settings_title: 'Paramètres',
  settings_description: 'Gérez les préférences de votre application.',
  settings_dark_mode: 'Mode Sombre',
  settings_language: 'Langue',
  settings_notifications: 'Alertes de citation (toutes les 3 heures)',
  settings_about_dev_title: 'À Propos du Développeur',
  settings_about_app_title: 'À propos de l\'application',
  settings_about_app_desc: 'L’application contient les Quotes datant de 2018 à 2025. La nouvelle version est compatible avec les systèmes IOS, Android et Web. L’application est interactive et permet aux utilisateurs de poser des questions ou d’émettre des commentaires. Elle est utilisable hors ligne. Des mises à jour seront requises pour accéder aux nouvelles fonctionnalités et aux quotes récemment intégrés.',
  refresh_button: 'Actualiser les citations avec l\'IA',
  refresh_button_loading: 'Actualisation...',
  refresh_description: 'Actualise périodiquement les citations dans la base de données Firestore à l\'aide de GenAI.',
  refresh_success_title: 'Succès',
  refresh_success_desc: 'Les citations ont été actualisées.',
  refresh_error_title: 'Erreur',
  refresh_error_desc: 'Échec de l\'actualisation des citations.',
  logout_button: 'Déconnexion',
  resources_title: 'Ressources Supplémentaires',
  resources_intro: 'Approfondissez votre parcours avec ces ressources de K-Square Ministries.',
  resources_book_title: 'Livre en vedette',
  resources_book_desc: 'Découvrez des stratégies et des idées pratiques pour une vie transformée. Ce livre est un guide pour libérer votre potentiel et vivre avec un but.',
  resources_book_button: 'Acheter sur Amazon',
  feedback_title: 'Faites-nous part de vos commentaires',
  feedback_description: 'Vous avez une question, un commentaire ou une suggestion ? Nous serions ravis de vous entendre !',
  feedback_form_name: 'Votre nom',
  feedback_form_email: 'Votre e-mail',
  feedback_form_message: 'Votre message',
  feedback_form_submit: 'Envoyer',
  feedback_form_submitting: 'Envoi en cours...',
  feedback_success_title: 'Merci !',
  feedback_success_desc: 'Vos commentaires ont été envoyés avec succès.',
  feedback_error_title: 'Erreur',
  feedback_error_desc: 'Une erreur s\'est produite lors de l\'envoi de vos commentaires.',
};

const en: Translations = {
  nav_home: 'Home',
  nav_favorites: 'Favorites',
  nav_resources: 'Resources',
  nav_feedback: 'Feedback',
  nav_about: 'About',
  nav_search: 'Search',
  search_title: 'Search Quotes',
  greeting_morning: 'Good morning,',
  greeting_evening: 'Good evening,',
  headline: 'Go through your day with inspired moments',
  settings_title: 'Settings',
  settings_description: 'Manage your app preferences.',
  settings_dark_mode: 'Dark Mode',
  settings_language: 'Language',
  settings_notifications: 'Quote Alerts (every 3 hours)',
  settings_about_dev_title: 'About The Developer',
  settings_about_app_title: 'About the App',
  settings_about_app_desc: 'The application contains quotes from 2018 to 2025. The new version is compatible with IOS, Android, and Web systems. The application is interactive and allows users to ask questions or make comments. It is usable offline. Updates will be required to access new features and recently integrated quotes.',
  refresh_button: 'Refresh Quotes with AI',
  refresh_button_loading: 'Refreshing...',
  refresh_description: 'Periodically refreshes quotes in the Firestore database using GenAI.',
  refresh_success_title: 'Success',
  refresh_success_desc: 'Quotes have been refreshed.',
  refresh_error_title: 'Error',
  refresh_error_desc: 'Failed to refresh quotes.',
  logout_button: 'Logout',
  resources_title: 'Additional Resources',
  resources_intro: 'Go deeper in your journey with these resources from K-Square Ministries.',
  resources_book_title: 'Featured Book',
  resources_book_desc: 'Discover practical strategies and insights for a transformed life. This book is a guide to unlocking your potential and living with purpose.',
  resources_book_button: 'Buy on Amazon',
  feedback_title: 'Give Us Your Feedback',
  feedback_description: 'Have a question, comment, or suggestion? We\'d love to hear from you!',
  feedback_form_name: 'Your Name',
  feedback_form_email: 'Your Email',
  feedback_form_message: 'Your Message',
  feedback_form_submit: 'Submit',
  feedback_form_submitting: 'Submitting...',
  feedback_success_title: 'Thank You!',
  feedback_success_desc: 'Your feedback has been sent successfully.',
  feedback_error_title: 'Error',
  feedback_error_desc: 'There was an error sending your feedback.',
};

const translations = { fr, en };

type Locale = 'fr' | 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLocale = localStorage.getItem('ksq-locale') as Locale | null;
    if (storedLocale && ['en', 'fr'].includes(storedLocale)) {
      setLocaleState(storedLocale);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'fr') {
        setLocaleState('fr');
      } else {
        setLocaleState('en');
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (isMounted) {
      localStorage.setItem('ksq-locale', newLocale);
    }
  };

  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
