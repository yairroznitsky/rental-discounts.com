
import React, { createContext, useContext, ReactNode } from 'react';

interface Translations {
  [key: string]: {
    en: string;
    es: string;
    pt: string;
    it: string;
    fr: string;
    de: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: 'Home', es: 'Inicio', pt: 'Início', it: 'Home', fr: 'Accueil', de: 'Startseite' },
  about: { en: 'About', es: 'Acerca de', pt: 'Sobre', it: 'Info', fr: 'À propos', de: 'Über uns' },
  contact: { en: 'Contact', es: 'Contacto', pt: 'Contato', it: 'Contatti', fr: 'Contact', de: 'Kontakt' },
  privacyPolicy: { en: 'Privacy Policy', es: 'Política de Privacidad', pt: 'Política de Privacidade', it: 'Informativa sulla Privacy', fr: 'Politique de Confidentialité', de: 'Datenschutzerklärung' },
  termsOfService: { en: 'Terms of Service', es: 'Términos de Servicio', pt: 'Termos de Serviço', it: 'Termini di Servizio', fr: 'Conditions d\'Utilisation', de: 'Nutzungsbedingungen' },
  backToHome: { en: 'Back to Home', es: 'Volver al Inicio', pt: 'Voltar ao Início', it: 'Torna alla Home', fr: 'Retour à l\'Accueil', de: 'Zurück zur Startseite' },
  
  // Footer
  footerDescription: { 
    en: 'Compare prices from hundreds of car rental companies worldwide. Find the best deals and book your next rental car with confidence.',
    es: 'Compara precios de cientos de empresas de alquiler de coches en todo el mundo. Encuentra las mejores ofertas y reserva tu próximo coche de alquiler con confianza.',
    pt: 'Compare preços de centenas de locadoras de carros no mundo todo. Encontre as melhores ofertas e reserve seu próximo carro alugado com confiança.',
    it: 'Confronta i prezzi di centinaia di compagnie di noleggio auto in tutto il mondo. Trova le migliori offerte e prenota la tua prossima auto a noleggio con fiducia.',
    fr: 'Comparez les prix de centaines de sociétés de location de voitures dans le monde. Trouvez les meilleures offres et réservez votre prochaine voiture de location en toute confiance.',
    de: 'Vergleichen Sie Preise von hunderten von Autovermietungen weltweit. Finden Sie die besten Angebote und buchen Sie Ihr nächstes Mietauto mit Vertrauen.'
  },
  quickLinks: { en: 'Quick Links', es: 'Enlaces Rápidos', pt: 'Links Rápidos', it: 'Link Rapidi', fr: 'Liens Rapides', de: 'Schnelllinks' },
  legal: { en: 'Legal', es: 'Legal', pt: 'Legal', it: 'Legale', fr: 'Mentions Légales', de: 'Rechtliches' },
  allRightsReserved: { en: 'All rights reserved.', es: 'Todos los derechos reservados.', pt: 'Todos os direitos reservados.', it: 'Tutti i diritti riservati.', fr: 'Tous droits réservés.', de: 'Alle Rechte vorbehalten.' },
  contactUs: { en: 'Contact Us', es: 'Contáctenos', pt: 'Entre em Contato', it: 'Contattaci', fr: 'Contactez-nous', de: 'Kontaktieren Sie Uns' },
  contactInformation: { en: 'Contact Information', es: 'Información de Contacto', pt: 'Informações de Contato', it: 'Informazioni di Contatto', fr: 'Informations de Contact', de: 'Kontaktinformationen' },
  
  // Hero section
  heroMainTitle: { 
    en: 'Car Rental Discounts', 
    es: 'Descuentos en Alquiler de Coches', 
    pt: 'Descontos em Aluguel de Carros', 
    it: 'Sconti sul Noleggio Auto', 
    fr: 'Réductions sur la Location de Voitures', 
    de: 'Rabatte auf Autovermietung' 
  },
  heroSubtitle: { 
    en: 'Unlock Exclusive Discounts Now!',
    es: '¡Desbloquea Descuentos Exclusivos Ahora!',
    pt: 'Desbloqueie Descontos Exclusivos Agora!',
    it: 'Sblocca Sconti Esclusivi Ora!',
    fr: 'Débloquez des Réductions Exclusives Maintenant!',
    de: 'Schalten Sie Jetzt Exklusive Rabatte Frei!'
  },
  trustedBy: { 
    en: 'Trusted by millions of travelers worldwide', 
    es: 'Confiable para millones de viajeros en todo el mundo', 
    pt: 'Confiável para milhões de viajantes em todo o mundo', 
    it: 'Fidato da milioni di viaggiatori in tutto il mondo', 
    fr: 'Fiable pour des millions de voyageurs dans le monde', 
    de: 'Vertraut von Millionen von Reisenden weltweit' 
  },
  heroBenefit1: { 
    en: 'Exclusive discount codes', 
    es: 'Códigos de descuento exclusivos', 
    pt: 'Códigos de desconto exclusivos', 
    it: 'Codici sconto esclusivi', 
    fr: 'Codes de réduction exclusifs', 
    de: 'Exklusive Rabattcodes' 
  },
  heroBenefit2: { 
    en: 'Save up to 30% on rentals', 
    es: 'Ahorra hasta un 30% en alquileres', 
    pt: 'Economize até 30% em aluguéis', 
    it: 'Risparmia fino al 30% sui noleggi', 
    fr: 'Économisez jusqu\'à 30% sur les locations', 
    de: 'Sparen Sie bis zu 30% bei Mietwagen' 
  },
  heroBenefit3: { 
    en: 'Compare 200+ rental companies', 
    es: 'Compara más de 200 empresas de alquiler', 
    pt: 'Compare mais de 200 locadoras', 
    it: 'Confronta oltre 200 compagnie di noleggio', 
    fr: 'Comparez plus de 200 sociétés de location', 
    de: 'Vergleichen Sie über 200 Autovermietungen' 
  },
  heroBenefit4: { 
    en: 'Cancel anytime, free of charge', 
    es: 'Cancela en cualquier momento, sin cargo', 
    pt: 'Cancele a qualquer momento, sem custo', 
    it: 'Cancella in qualsiasi momento, gratuitamente', 
    fr: 'Annulez à tout moment, gratuitement', 
    de: 'Jederzeit kostenlos stornieren' 
  },
  
  // Search form
  pickupLocation: { en: 'Pickup Location', es: 'Lugar de Recogida', pt: 'Local de Retirada', it: 'Luogo di Ritiro', fr: 'Lieu de Prise en Charge', de: 'Abholort' },
  dropoffLocation: { en: 'Drop-off Location', es: 'Lugar de Entrega', pt: 'Local de Devolução', it: 'Luogo di Riconsegna', fr: 'Lieu de Retour', de: 'Rückgabeort' },
  locationPlaceholder: { en: 'Airport, city, or station', es: 'Aeropuerto, ciudad o estación', pt: 'Aeroporto, cidade ou estação', it: 'Aeroporto, città o stazione', fr: 'Aéroport, ville ou gare', de: 'Flughafen, Stadt oder Bahnhof' },
  pickupLocationPlaceholder: { en: 'Enter pickup location', es: 'Ingresa lugar de recogida', pt: 'Digite o local de retirada', it: 'Inserisci luogo di ritiro', fr: 'Entrez le lieu de prise en charge', de: 'Abholort eingeben' },
  dropoffLocationPlaceholder: { en: 'Enter drop-off location', es: 'Ingresa lugar de entrega', pt: 'Digite o local de devolução', it: 'Inserisci luogo di riconsegna', fr: 'Entrez le lieu de retour', de: 'Rückgabeort eingeben' },
  differentDropoffLabel: { en: 'Different drop-off', es: 'Entrega diferente', pt: 'Devolução diferente', it: 'Riconsegna diversa', fr: 'Retour différent', de: 'Andere Rückgabe' },
  dropCarOffDifferentLocation: { en: 'Drop car off at different location', es: 'Dejar el coche en un lugar diferente', pt: 'Deixar o carro em local diferente', it: 'Lasciare l\'auto in un luogo diverso', fr: 'Déposer la voiture à un endroit différent', de: 'Auto an einem anderen Ort abgeben' },
  pickupDate: { en: 'Pickup Date', es: 'Fecha de Recogida', pt: 'Data de Retirada', it: 'Data di Ritiro', fr: 'Date de Prise en Charge', de: 'Abholdatum' },
  dropoffDate: { en: 'Drop-off Date', es: 'Fecha de Entrega', pt: 'Data de Devolução', it: 'Data di Riconsegna', fr: 'Date de Retour', de: 'Rückgabedatum' },
  pickupTime: { en: 'Pickup Time', es: 'Hora de Recogida', pt: 'Hora de Retirada', it: 'Ora di Ritiro', fr: 'Heure de Prise en Charge', de: 'Abholzeit' },
  dropoffTime: { en: 'Drop-off Time', es: 'Hora de Entrega', pt: 'Hora de Devolução', it: 'Ora di Riconsegna', fr: 'Heure de Retour', de: 'Rückgabezeit' },
  searchCars: { en: 'Search', es: 'Buscar', pt: 'Buscar', it: 'Cerca', fr: 'Rechercher', de: 'Suchen' },
  
  // Cookie consent
  cookieMessage: { 
    en: 'By using this website, you automatically accept that we use cookies.', 
    es: 'Al usar este sitio web, automáticamente aceptas que usemos cookies.', 
    pt: 'Ao usar este site, você automaticamente aceita que usemos cookies.', 
    it: 'Utilizzando questo sito web, accetti automaticamente che utilizziamo i cookie.', 
    fr: 'En utilisant ce site web, vous acceptez automatiquement que nous utilisions des cookies.', 
    de: 'Durch die Nutzung dieser Website akzeptieren Sie automatisch, dass wir Cookies verwenden.' 
  },
  accept: { en: 'Accept', es: 'Aceptar', pt: 'Aceitar', it: 'Accetta', fr: 'Accepter', de: 'Akzeptieren' },
  reject: { en: 'Reject', es: 'Rechazar', pt: 'Rejeitar', it: 'Rifiuta', fr: 'Rejeter', de: 'Ablehnen' },
  
  // Results page
  searchingForBestDeals: { en: 'Searching for the best deals for you', es: 'Buscando las mejores ofertas para ti', pt: 'Buscando as melhores ofertas para você', it: 'Cercando le migliori offerte per te', fr: 'Recherche des meilleures offres pour vous', de: 'Suche nach den besten Angeboten für Sie' },
  searchResults: { en: 'Search Results', es: 'Resultados de Búsqueda', pt: 'Resultados da Busca', it: 'Risultati della Ricerca', fr: 'Résultats de Recherche', de: 'Suchergebnisse' },
  searchResultsSubtitle: { en: 'Here are the available cars for your search criteria', es: 'Aquí están los coches disponibles para tus criterios de búsqueda', pt: 'Aqui estão os carros disponíveis para seus critérios de busca', it: 'Ecco le auto disponibili per i tuoi criteri di ricerca', fr: 'Voici les voitures disponibles selon vos critères de recherche', de: 'Hier sind die verfügbaren Autos für Ihre Suchkriterien' },
  yourSearch: { en: 'Your Search', es: 'Tu Búsqueda', pt: 'Sua Busca', it: 'La Tua Ricerca', fr: 'Votre Recherche', de: 'Ihre Suche' },
  carImagePlaceholder: { en: 'Car Image', es: 'Imagen del Coche', pt: 'Imagem do Carro', it: 'Immagine Auto', fr: 'Image de Voiture', de: 'Autobild' },
  selectCar: { en: 'Select Car', es: 'Seleccionar Coche', pt: 'Selecionar Carro', it: 'Seleziona Auto', fr: 'Sélectionner Voiture', de: 'Auto auswählen' },
  notSpecified: { en: 'Not specified', es: 'No especificado', pt: 'Não especificado', it: 'Non specificato', fr: 'Non spécifié', de: 'Nicht angegeben' },
};

interface LanguageContextType {
  language: 'en' | 'es' | 'pt' | 'it' | 'fr' | 'de';
  setLanguage: (lang: 'en' | 'es' | 'pt' | 'it' | 'fr' | 'de') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  currentLanguage?: 'en' | 'es' | 'pt' | 'it' | 'fr' | 'de';
  onLanguageChange?: (lang: 'en' | 'es' | 'pt' | 'it' | 'fr' | 'de') => void;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  currentLanguage = 'en',
  onLanguageChange 
}) => {
  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || key;
  };

  const setLanguage = (lang: 'en' | 'es' | 'pt' | 'it' | 'fr' | 'de') => {
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language: currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
