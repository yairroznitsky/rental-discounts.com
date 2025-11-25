import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  const { t, language } = useLanguage();

  const content = {
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: December 2024',
      sections: [
        {
          title: 'Acceptance of Terms',
          content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          title: 'Description of Service',
          content: 'We provide a platform for comparing car rental prices from various providers. Our service allows users to search for available vehicles, compare rates, and access booking information.'
        },
        {
          title: 'User Responsibilities',
          content: 'You are responsible for providing accurate information when using our service. You must be at least 18 years old to use this service and must comply with all applicable laws and regulations.'
        },
        {
          title: 'Intellectual Property',
          content: 'All content on this website, including text, graphics, logos, and software, is the property of our company or its content suppliers and is protected by copyright laws.'
        },
        {
          title: 'Limitation of Liability',
          content: 'We are not responsible for any damages that may occur to you as a result of your misuse of our website. We reserve the right to edit, modify, and change this agreement at any time.'
        },
        {
          title: 'Privacy Policy',
          content: 'Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.'
        },
        {
          title: 'Governing Law',
          content: 'These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company operates, without regard to its conflict of law provisions.'
        },
        {
          title: 'Contact Information',
          content: 'If you have any questions about these Terms of Service, please contact us at business@rental-bookings.com.'
        }
      ]
    },
    es: {
      title: 'Términos de Servicio',
      lastUpdated: 'Última actualización: Diciembre 2024',
      sections: [
        {
          title: 'Aceptación de Términos',
          content: 'Al acceder y usar este sitio web, usted acepta y acuerda estar sujeto a los términos y disposiciones de este acuerdo. Si no está de acuerdo en cumplir con lo anterior, por favor no use este servicio.'
        },
        {
          title: 'Descripción del Servicio',
          content: 'Proporcionamos una plataforma para comparar precios de alquiler de coches de varios proveedores. Nuestro servicio permite a los usuarios buscar vehículos disponibles, comparar tarifas y acceder a información de reserva.'
        },
        {
          title: 'Responsabilidades del Usuario',
          content: 'Usted es responsable de proporcionar información precisa al usar nuestro servicio. Debe tener al menos 18 años para usar este servicio y debe cumplir con todas las leyes y regulaciones aplicables.'
        },
        {
          title: 'Propiedad Intelectual',
          content: 'Todo el contenido en este sitio web, incluyendo texto, gráficos, logos y software, es propiedad de nuestra empresa o sus proveedores de contenido y está protegido por las leyes de derechos de autor.'
        },
        {
          title: 'Limitación de Responsabilidad',
          content: 'No somos responsables de ningún daño que pueda ocurrirle como resultado de su mal uso de nuestro sitio web. Nos reservamos el derecho de editar, modificar y cambiar este acuerdo en cualquier momento.'
        },
        {
          title: 'Política de Privacidad',
          content: 'Su privacidad es importante para nosotros. Por favor revise nuestra Política de Privacidad, que también rige su uso del servicio, para entender nuestras prácticas.'
        },
        {
          title: 'Ley Aplicable',
          content: 'Estos términos se regirán e interpretarán de acuerdo con las leyes de la jurisdicción en la que opera nuestra empresa, sin tener en cuenta sus disposiciones de conflicto de leyes.'
        },
        {
          title: 'Información de Contacto',
          content: 'Si tiene alguna pregunta sobre estos Términos de Servicio, contáctenos en business@rental-bookings.com.'
        }
      ]
    },
    pt: {
      title: 'Termos de Serviço',
      lastUpdated: 'Última atualização: Dezembro 2024',
      sections: [
        {
          title: 'Aceitação dos Termos',
          content: 'Ao acessar e usar este site, você aceita e concorda em estar vinculado aos termos e disposições deste acordo. Se você não concordar em cumprir o acima, por favor não use este serviço.'
        },
        {
          title: 'Descrição do Serviço',
          content: 'Fornecemos uma plataforma para comparar preços de aluguel de carros de vários provedores. Nosso serviço permite que os usuários pesquisem veículos disponíveis, comparem tarifas e acessem informações de reserva.'
        },
        {
          title: 'Responsabilidades do Usuário',
          content: 'Você é responsável por fornecer informações precisas ao usar nosso serviço. Você deve ter pelo menos 18 anos para usar este serviço e deve cumprir todas as leis e regulamentos aplicáveis.'
        },
        {
          title: 'Propriedade Intelectual',
          content: 'Todo o conteúdo neste site, incluindo texto, gráficos, logos e software, é propriedade de nossa empresa ou seus fornecedores de conteúdo e é protegido pelas leis de direitos autorais.'
        },
        {
          title: 'Limitação de Responsabilidade',
          content: 'Não somos responsáveis por quaisquer danos que possam ocorrer a você como resultado do uso inadequado de nosso site. Reservamo-nos o direito de editar, modificar e alterar este acordo a qualquer momento.'
        },
        {
          title: 'Política de Privacidade',
          content: 'Sua privacidade é importante para nós. Por favor, revise nossa Política de Privacidade, que também rege seu uso do serviço, para entender nossas práticas.'
        },
        {
          title: 'Lei Aplicável',
          content: 'Estes termos serão regidos e interpretados de acordo com as leis da jurisdição em que nossa empresa opera, sem consideração às suas disposições de conflito de leis.'
        },
        {
          title: 'Informações de Contato',
          content: 'Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco em business@rental-bookings.com.'
        }
      ]
    },
    it: {
      title: 'Termini di Servizio',
      lastUpdated: 'Ultimo aggiornamento: Dicembre 2024',
      sections: [
        {
          title: 'Accettazione dei Termini',
          content: 'Accedendo e utilizzando questo sito web, accetti e accetti di essere vincolato dai termini e dalle disposizioni di questo accordo. Se non sei d\'accordo a rispettare quanto sopra, non utilizzare questo servizio.'
        },
        {
          title: 'Descrizione del Servizio',
          content: 'Forniamo una piattaforma per confrontare i prezzi del noleggio auto di vari fornitori. Il nostro servizio consente agli utenti di cercare veicoli disponibili, confrontare le tariffe e accedere alle informazioni di prenotazione.'
        },
        {
          title: 'Responsabilità dell\'Utente',
          content: 'Sei responsabile di fornire informazioni accurate quando utilizzi il nostro servizio. Devi avere almeno 18 anni per utilizzare questo servizio e devi rispettare tutte le leggi e i regolamenti applicabili.'
        },
        {
          title: 'Proprietà Intellettuale',
          content: 'Tutto il contenuto su questo sito web, inclusi testo, grafica, loghi e software, è di proprietà della nostra azienda o dei suoi fornitori di contenuti ed è protetto dalle leggi sul copyright.'
        },
        {
          title: 'Limitazione di Responsabilità',
          content: 'Non siamo responsabili per eventuali danni che potrebbero verificarsi a te come risultato del tuo uso improprio del nostro sito web. Ci riserviamo il diritto di modificare, modificare e cambiare questo accordo in qualsiasi momento.'
        },
        {
          title: 'Informativa sulla Privacy',
          content: 'La tua privacy è importante per noi. Si prega di rivedere la nostra Informativa sulla Privacy, che regola anche il tuo utilizzo del servizio, per comprendere le nostre pratiche.'
        },
        {
          title: 'Legge Applicabile',
          content: 'Questi termini saranno regolati e interpretati in conformità con le leggi della giurisdizione in cui opera la nostra azienda, indipendentemente dalle sue disposizioni sui conflitti di legge.'
        },
        {
          title: 'Informazioni di Contatto',
          content: 'Se hai domande su questi Termini di Servizio, contattaci a business@rental-bookings.com.'
        }
      ]
    },
    fr: {
      title: 'Conditions d\'Utilisation',
      lastUpdated: 'Dernière mise à jour : Décembre 2024',
      sections: [
        {
          title: 'Acceptation des Conditions',
          content: 'En accédant et en utilisant ce site web, vous acceptez et acceptez d\'être lié par les termes et dispositions de cet accord. Si vous n\'êtes pas d\'accord pour respecter ce qui précède, veuillez ne pas utiliser ce service.'
        },
        {
          title: 'Description du Service',
          content: 'Nous fournissons une plateforme pour comparer les prix de location de voitures de divers fournisseurs. Notre service permet aux utilisateurs de rechercher des véhicules disponibles, de comparer les tarifs et d\'accéder aux informations de réservation.'
        },
        {
          title: 'Responsabilités de l\'Utilisateur',
          content: 'Vous êtes responsable de fournir des informations précises lors de l\'utilisation de notre service. Vous devez avoir au moins 18 ans pour utiliser ce service et vous devez respecter toutes les lois et réglementations applicables.'
        },
        {
          title: 'Propriété Intellectuelle',
          content: 'Tout le contenu de ce site web, y compris le texte, les graphiques, les logos et les logiciels, est la propriété de notre entreprise ou de ses fournisseurs de contenu et est protégé par les lois sur les droits d\'auteur.'
        },
        {
          title: 'Limitation de Responsabilité',
          content: 'Nous ne sommes pas responsables des dommages qui pourraient vous survenir à la suite de votre mauvaise utilisation de notre site web. Nous nous réservons le droit de modifier, modifier et changer cet accord à tout moment.'
        },
        {
          title: 'Politique de Confidentialité',
          content: 'Votre vie privée est importante pour nous. Veuillez consulter notre Politique de Confidentialité, qui régit également votre utilisation du service, pour comprendre nos pratiques.'
        },
        {
          title: 'Loi Applicable',
          content: 'Ces conditions seront régies et interprétées conformément aux lois de la juridiction dans laquelle notre entreprise opère, sans égard à ses dispositions de conflit de lois.'
        },
        {
          title: 'Informations de Contact',
          content: 'Si vous avez des questions sur ces Conditions d\'Utilisation, contactez-nous à business@rental-bookings.com.'
        }
      ]
    },
    de: {
      title: 'Nutzungsbedingungen',
      lastUpdated: 'Zuletzt aktualisiert: Dezember 2024',
      sections: [
        {
          title: 'Annahme der Bedingungen',
          content: 'Durch den Zugriff auf und die Nutzung dieser Website akzeptieren und stimmen Sie zu, an die Bedingungen und Bestimmungen dieser Vereinbarung gebunden zu sein. Wenn Sie nicht damit einverstanden sind, sich an das oben Genannte zu halten, verwenden Sie bitte diesen Dienst nicht.'
        },
        {
          title: 'Beschreibung des Dienstes',
          content: 'Wir bieten eine Plattform zum Vergleichen von Autovermietungspreisen verschiedener Anbieter. Unser Dienst ermöglicht es Benutzern, verfügbare Fahrzeuge zu suchen, Tarife zu vergleichen und auf Buchungsinformationen zuzugreifen.'
        },
        {
          title: 'Benutzerverantwortlichkeiten',
          content: 'Sie sind verantwortlich für die Bereitstellung genauer Informationen bei der Nutzung unseres Dienstes. Sie müssen mindestens 18 Jahre alt sein, um diesen Dienst zu nutzen, und müssen alle geltenden Gesetze und Vorschriften einhalten.'
        },
        {
          title: 'Geistiges Eigentum',
          content: 'Alle Inhalte auf dieser Website, einschließlich Text, Grafiken, Logos und Software, sind das Eigentum unseres Unternehmens oder seiner Inhaltslieferanten und sind durch Urheberrechtsgesetze geschützt.'
        },
        {
          title: 'Haftungsbeschränkung',
          content: 'Wir sind nicht verantwortlich für Schäden, die Ihnen durch den Missbrauch unserer Website entstehen könnten. Wir behalten uns das Recht vor, diese Vereinbarung jederzeit zu bearbeiten, zu ändern und zu ändern.'
        },
        {
          title: 'Datenschutzerklärung',
          content: 'Ihre Privatsphäre ist uns wichtig. Bitte überprüfen Sie unsere Datenschutzerklärung, die auch Ihre Nutzung des Dienstes regelt, um unsere Praktiken zu verstehen.'
        },
        {
          title: 'Geltendes Recht',
          content: 'Diese Bedingungen unterliegen den Gesetzen der Gerichtsbarkeit, in der unser Unternehmen tätig ist, und werden in Übereinstimmung mit diesen ausgelegt, unabhängig von den Bestimmungen über Kollisionsrecht.'
        },
        {
          title: 'Kontaktinformationen',
          content: 'Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren Sie uns unter business@rental-bookings.com.'
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('backToHome')}
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {currentContent.title}
              </h1>
              <p className="text-gray-600 text-lg">
                {currentContent.lastUpdated}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {currentContent.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
