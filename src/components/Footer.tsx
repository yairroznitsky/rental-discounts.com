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
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 rental-discounts.com. {t('allRightsReserved')} Be Like Water Ltd.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                to={createLanguageAwareUrl('/contact-us')} 
                className="text-gray-400 hover:text-yellow-300 transition-colors text-sm"
              >
                {t('contactUs')}
              </Link>
              <Link 
                to={createLanguageAwareUrl('/privacy-policy')} 
                className="text-gray-400 hover:text-yellow-300 transition-colors text-sm"
              >
                {t('privacyPolicy')}
              </Link>
              <Link 
                to={createLanguageAwareUrl('/terms-of-service')} 
                className="text-gray-400 hover:text-yellow-300 transition-colors text-sm"
              >
                {t('termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
