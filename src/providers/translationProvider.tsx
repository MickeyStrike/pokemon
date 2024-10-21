// translationProvider.tsx
'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/config/i18n'; // Import the i18n config here

interface TranslationProviderProps {
  children: React.ReactNode;
}

export default function TranslationProvider({ children }: TranslationProviderProps) {
  const { i18n } = useTranslation();

  // Optional: You can handle dynamic language changes here.
  useEffect(() => {
    i18n.changeLanguage('en'); // Default to English
  }, [i18n]);

  return <>{children}</>;
}
