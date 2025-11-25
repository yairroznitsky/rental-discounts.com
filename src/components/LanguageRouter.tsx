import React, { useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/hooks/useLanguage';
import Index from '../pages/Index';
import Results from '../pages/Results';
import SearchPassthrough from '../pages/SearchPassthrough';
import NotFound from '../pages/NotFound';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import ContactUs from '../pages/ContactUs';
import { CookieConsent } from './CookieConsent';

// Supported languages with their URL prefixes
const SUPPORTED_LANGUAGES = ['en', 'es', 'pt', 'it', 'fr', 'de'] as const;
type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Language detection from URL
const detectLanguageFromPath = (pathname: string): SupportedLanguage => {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (SUPPORTED_LANGUAGES.includes(firstSegment as SupportedLanguage)) {
    return firstSegment as SupportedLanguage;
  }
  
  return 'en'; // Default to English
};

// Remove language prefix from path
const removeLanguagePrefix = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (SUPPORTED_LANGUAGES.includes(firstSegment as SupportedLanguage)) {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
};

// Add language prefix to path
const addLanguagePrefix = (pathname: string, language: SupportedLanguage): string => {
  if (language === 'en') {
    return pathname === '/' ? '/' : pathname;
  }
  
  const cleanPath = pathname === '/' ? '' : pathname;
  return `/${language}${cleanPath}`;
};

const LanguageRouterInner: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Detect current language from URL
  const currentLanguage = detectLanguageFromPath(location.pathname);
  
  // Language change handler
  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    const currentPath = removeLanguagePrefix(location.pathname);
    const newPath = addLanguagePrefix(currentPath, newLanguage);
    navigate(newPath);
  };

  return (
    <LanguageProvider 
      currentLanguage={currentLanguage} 
      onLanguageChange={handleLanguageChange}
    >
      <Routes>
        {/* Routes without language prefix (default to English) */}
        <Route path="/" element={<Index />} />
        <Route path="/results" element={<Results />} />
        <Route path="/search" element={<SearchPassthrough />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact-us" element={<ContactUs />} />
        
        {/* Routes with language prefixes */}
        <Route path="/es" element={<Index />} />
        <Route path="/es/results" element={<Results />} />
        <Route path="/es/search" element={<SearchPassthrough />} />
        <Route path="/es/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/es/terms-of-service" element={<TermsOfService />} />
        <Route path="/es/contact-us" element={<ContactUs />} />
        
        <Route path="/pt" element={<Index />} />
        <Route path="/pt/results" element={<Results />} />
        <Route path="/pt/search" element={<SearchPassthrough />} />
        <Route path="/pt/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/pt/terms-of-service" element={<TermsOfService />} />
        <Route path="/pt/contact-us" element={<ContactUs />} />
        
        <Route path="/it" element={<Index />} />
        <Route path="/it/results" element={<Results />} />
        <Route path="/it/search" element={<SearchPassthrough />} />
        <Route path="/it/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/it/terms-of-service" element={<TermsOfService />} />
        <Route path="/it/contact-us" element={<ContactUs />} />
        
        <Route path="/fr" element={<Index />} />
        <Route path="/fr/results" element={<Results />} />
        <Route path="/fr/search" element={<SearchPassthrough />} />
        <Route path="/fr/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/fr/terms-of-service" element={<TermsOfService />} />
        <Route path="/fr/contact-us" element={<ContactUs />} />
        
        <Route path="/de" element={<Index />} />
        <Route path="/de/results" element={<Results />} />
        <Route path="/de/search" element={<SearchPassthrough />} />
        <Route path="/de/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/de/terms-of-service" element={<TermsOfService />} />
        <Route path="/de/contact-us" element={<ContactUs />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Only show cookie consent on non-passthrough pages */}
      {!location.pathname.includes('/search') && (
        <CookieConsent onAccept={() => {}} onReject={() => {}} />
      )}
    </LanguageProvider>
  );
};

export const LanguageRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageRouterInner />
    </BrowserRouter>
  );
};