import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  const { t, language } = useLanguage();

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team',
      description: 'Have questions about our car rental comparison service? We\'re here to help. Reach out to us through any of the methods below.',
      sections: [
        {
          title: 'Business Inquiries',
          content: 'For business partnerships and corporate inquiries, please contact our business development team.',
          icon: Mail,
          details: 'business@rental-bookings.com'
        }
      ],
      formTitle: 'Send us a Message',
      formDescription: 'Fill out the form below and we\'ll get back to you as soon as possible.',
      formFields: {
        name: 'Full Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message'
      }
    },
    es: {
      title: 'Contáctenos',
      subtitle: 'Póngase en contacto con nuestro equipo',
      description: '¿Tiene preguntas sobre nuestro servicio de comparación de alquiler de coches? Estamos aquí para ayudar. Contáctenos a través de cualquiera de los métodos a continuación.',
      sections: [
        {
          title: 'Consultas Comerciales',
          content: 'Para asociaciones comerciales y consultas corporativas, contáctenos con nuestro equipo de desarrollo comercial.',
          icon: Mail,
          details: 'business@rental-bookings.com'
        }
      ],
      formTitle: 'Envíenos un Mensaje',
      formDescription: 'Complete el formulario a continuación y le responderemos lo antes posible.',
      formFields: {
        name: 'Nombre Completo',
        email: 'Dirección de Email',
        subject: 'Asunto',
        message: 'Mensaje',
        submit: 'Enviar Mensaje'
      }
    },
    pt: {
      title: 'Entre em Contato',
      subtitle: 'Entre em contato com nossa equipe',
      description: 'Tem perguntas sobre nosso serviço de comparação de aluguel de carros? Estamos aqui para ajudar. Entre em contato conosco através de qualquer um dos métodos abaixo.',
      sections: [
        {
          title: 'Consultas Comerciais',
          content: 'Para parcerias comerciais e consultas corporativas, entre em contato com nossa equipe de desenvolvimento comercial.',
          icon: Mail,
          details: 'business@rental-bookings.com'
        }
      ],
      formTitle: 'Envie-nos uma Mensagem',
      formDescription: 'Preencha o formulário abaixo e responderemos o mais rápido possível.',
      formFields: {
        name: 'Nome Completo',
        email: 'Endereço de Email',
        subject: 'Assunto',
        message: 'Mensagem',
        submit: 'Enviar Mensagem'
      }
    },
    it: {
      title: 'Contattaci',
      subtitle: 'Mettiti in contatto con il nostro team',
      description: 'Hai domande sul nostro servizio di confronto noleggio auto? Siamo qui per aiutarti. Contattaci attraverso uno dei metodi qui sotto.',
      sections: [
        {
          title: 'Richieste Commerciali',
          content: 'Per partnership commerciali e richieste aziendali, contatta il nostro team di sviluppo commerciale.',
          icon: Mail,
          details: 'business@rental-bookings.com'
        }
      ],
      formTitle: 'Inviaci un Messaggio',
      formDescription: 'Compila il modulo qui sotto e ti risponderemo il prima possibile.',
      formFields: {
        name: 'Nome Completo',
        email: 'Indirizzo Email',
        subject: 'Oggetto',
        message: 'Messaggio',
        submit: 'Invia Messaggio'
      }
    },
    fr: {
      title: 'Contactez-nous',
      subtitle: 'Contactez notre équipe',
      description: 'Vous avez des questions sur notre service de comparaison de location de voitures ? Nous sommes là pour vous aider. Contactez-nous par l\'un des moyens ci-dessous.',
      sections: [
        {
          title: 'Demandes Commerciales',
          content: 'Pour les partenariats commerciaux et les demandes d\'entreprise, veuillez contacter notre équipe de développement commercial.',
          icon: Mail,
          details: 'business@rental-bookings.com'
        }
      ],
      formTitle: 'Envoyez-nous un Message',
      formDescription: 'Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible.',
      formFields: {
        name: 'Nom Complet',
        email: 'Adresse Email',
        subject: 'Sujet',
        message: 'Message',
        submit: 'Envoyer le Message'
      }
    },
    de: {
      title: 'Kontaktieren Sie Uns',
      subtitle: 'Kontaktieren Sie unser Team',
      description: 'Haben Sie Fragen zu unserem Autovermietungsvergleichsdienst? Wir sind hier, um zu helfen. Kontaktieren Sie uns über eine der unten genannten Methoden.',
      sections: [
        {
          title: 'Geschäftsanfragen',
          content: 'Für Geschäftspartnerschaften und Unternehmensanfragen kontaktieren Sie bitte unser Business Development Team.',
          icon: Mail,
          details: 'business@rental-bookings.com'
        }
      ],
      formTitle: 'Senden Sie uns eine Nachricht',
      formDescription: 'Füllen Sie das untenstehende Formular aus und wir antworten Ihnen so schnell wie möglich.',
      formFields: {
        name: 'Vollständiger Name',
        email: 'E-Mail-Adresse',
        subject: 'Betreff',
        message: 'Nachricht',
        submit: 'Nachricht Senden'
      }
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
              <p className="text-xl text-gray-600 mb-4">
                {currentContent.subtitle}
              </p>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {currentContent.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t('contactInformation')}
                </h2>
                <div className="space-y-6">
                  {currentContent.sections.map((section, index) => {
                    const IconComponent = section.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {section.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {section.content}
                          </p>
                          <p className="text-blue-600 font-medium">
                            {section.details}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {currentContent.formTitle}
                </h2>
                <p className="text-gray-600 mb-6">
                  {currentContent.formDescription}
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.formFields.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.formFields.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.formFields.subject}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.formFields.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    {currentContent.formFields.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
