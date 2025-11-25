import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { X } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface CookieConsentProps {
  onAccept: (preferences: CookiePreferences) => void;
  onReject: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onReject }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    onAccept(preferences);
    setIsVisible(false);
  };

  const handleReject = () => {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    onReject();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop - clicking outside closes the popup */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsVisible(false)}
      />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm border-t border-gray-600 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex-1 mr-4">
              <p className="text-gray-200">
                {t('cookieMessage')}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleReject}
                className="px-3 py-1.5 text-gray-300 hover:text-white transition-colors"
              >
                {t('reject')}
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-1.5 bg-[#219f61] hover:bg-[#1a7d4d] text-white rounded transition-colors"
              >
                {t('accept')}
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
