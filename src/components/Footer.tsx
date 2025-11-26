import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

export const Footer = () => {
  const { t, language } = useLanguage();

  // Helper function to create language-aware URLs
  const createLanguageAwareUrl = (path: string): string => {
    if (language === 'en') {
      return path;
    }
    return `/${language}${path}`;
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright - Left */}
          <p className="text-gray-600 text-sm text-center md:text-left">
            © 2024 rental-discounts.com. {t('allRightsReserved')} Be Like Water Ltd.
          </p>
          
          {/* Links - Right */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link 
              to={createLanguageAwareUrl('/privacy-policy')} 
              className="text-gray-600 hover:text-[#219f61] transition-colors text-sm font-medium"
            >
              {t('privacyPolicy')}
            </Link>
            <Link 
              to={createLanguageAwareUrl('/terms-of-service')} 
              className="text-gray-600 hover:text-[#219f61] transition-colors text-sm font-medium"
            >
              {t('termsOfService')}
            </Link>
            <Link 
              to={createLanguageAwareUrl('/contact-us')} 
              className="text-gray-600 hover:text-[#219f61] transition-colors text-sm font-medium"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
