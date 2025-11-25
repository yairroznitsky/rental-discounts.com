import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const { t, language } = useLanguage();

  // Fallback content in case translations fail
  const fallbackContent = {
      title: 'Privacy Policy & Cookie Policy',
      lastUpdated: 'Last updated: December 2024',
      sections: [
        {
          title: 'Information We Collect',
        content: 'We collect information you provide directly to us, such as when you search for car rentals, including pickup and drop-off locations, dates, and times.',
          subsections: [
            {
              title: 'Personal Information',
              content: 'Name, email address, phone number, location data, search preferences, and any other information you choose to provide.'
          }
        ]
      }
    ]
  };

  const content = {
    en: {
      title: 'Privacy Policy & Cookie Policy',
      lastUpdated: 'Last updated: December 2024',
      sections: [
        {
          title: 'Information We Collect',
          content: 'We collect information you provide directly to us, such as when you search for car rentals, including pickup and drop-off locations, dates, and times. We also collect information about your device and usage patterns.',
          subsections: [
            {
              title: 'Personal Information',
              content: 'Name, email address, phone number, location data, search preferences, and any other information you choose to provide.'
            },
            {
              title: 'Device Information',
              content: 'IP address, browser type, operating system, device identifiers, and technical information about your device and connection.'
            },
            {
              title: 'Usage Information',
              content: 'Search queries, pages visited, time spent on pages, links clicked, and other interactions with our service.'
            }
          ]
        },
        {
          title: 'How We Use Your Information',
          content: 'We use the information we collect to provide, maintain, and improve our services, process your car rental searches, and communicate with you about our services.',
          subsections: [
            {
              title: 'Service Provision',
              content: 'To provide car rental comparison services, process searches, and deliver relevant results.'
            },
            {
              title: 'Communication',
              content: 'To send you service updates, respond to inquiries, and provide customer support.'
            },
            {
              title: 'Improvement',
              content: 'To analyze usage patterns, improve our services, and develop new features.'
            },
            {
              title: 'Legal Compliance',
              content: 'To comply with applicable laws, regulations, and legal processes.'
            }
          ]
        },
        {
          title: 'Information Sharing',
          content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.',
          subsections: [
            {
              title: 'Service Providers',
              content: 'We may share information with trusted third-party service providers who assist us in operating our website and providing services.'
            },
            {
              title: 'Legal Requirements',
              content: 'We may disclose information when required by law, court order, or government request.'
            },
            {
              title: 'Business Transfers',
              content: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.'
            }
          ]
        },
        {
          title: 'Data Security',
          content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
          subsections: [
            {
              title: 'Technical Safeguards',
              content: 'Encryption, secure servers, firewalls, and other technical measures to protect data.'
            },
            {
              title: 'Access Controls',
              content: 'Limited access to personal information on a need-to-know basis.'
            },
            {
              title: 'Regular Monitoring',
              content: 'Continuous monitoring and regular security assessments of our systems.'
            }
          ]
        },
        {
          title: 'Cookie Policy',
          content: 'We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and provide personalized content.',
          subsections: [
            {
              title: 'What Are Cookies',
              content: 'Cookies are small text files stored on your device that help us remember your preferences and provide a better user experience.'
            },
            {
              title: 'Types of Cookies We Use',
              content: 'Necessary cookies (essential for website functionality), analytics cookies (to understand usage), marketing cookies (for personalized content), and preference cookies (to remember your choices).'
            },
            {
              title: 'Third-Party Cookies',
              content: 'We may use third-party services that place cookies on your device, such as Google Analytics for website analytics and advertising partners for relevant content.'
            },
            {
              title: 'Managing Cookies',
              content: 'You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.'
            }
          ]
        },
        {
          title: 'Data Retention',
          content: 'We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy.',
          subsections: [
            {
              title: 'Retention Periods',
              content: 'Account data: until account deletion; Usage data: 2 years; Marketing data: until consent withdrawal; Legal requirements: as required by applicable law.'
            },
            {
              title: 'Data Deletion',
              content: 'You may request deletion of your personal information at any time through our privacy controls or by contacting us directly.'
            }
          ]
        },
        {
          title: 'Your Rights',
          content: 'You have the right to access, correct, or delete your personal information. You may also opt out of certain communications and data collection practices.',
          subsections: [
            {
              title: 'Access and Portability',
              content: 'Request a copy of your personal data in a portable format.'
            },
            {
              title: 'Correction',
              content: 'Request correction of inaccurate or incomplete personal information.'
            },
            {
              title: 'Deletion',
              content: 'Request deletion of your personal data, subject to legal requirements.'
            },
            {
              title: 'Opt-Out',
              content: 'Opt out of marketing communications and certain data collection practices.'
            }
          ]
        },
        {
          title: 'International Data Transfers',
          content: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.',
          subsections: [
            {
              title: 'Transfer Locations',
              content: 'Data may be processed in the United States, European Union, and other countries where our service providers operate.'
            },
            {
              title: 'Safeguards',
              content: 'We use standard contractual clauses, adequacy decisions, and other appropriate safeguards to protect your data during international transfers.'
            }
          ]
        },
        {
          title: 'Children\'s Privacy',
          content: 'Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.',
          subsections: [
            {
              title: 'Age Verification',
              content: 'If you are under 13, please do not use our services or provide any personal information.'
            },
            {
              title: 'Parental Rights',
              content: 'If you believe we have collected information from a child under 13, please contact us immediately.'
            }
          ]
        },
        {
          title: 'Changes to This Policy',
          content: 'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page.',
          subsections: [
            {
              title: 'Notification',
              content: 'We will notify you of significant changes through email, website notice, or other appropriate means.'
            },
            {
              title: 'Continued Use',
              content: 'Your continued use of our services after changes become effective constitutes acceptance of the updated policy.'
            }
          ]
        },
        {
          title: 'Contact Us',
          content: 'If you have any questions about this Privacy Policy or our data practices, please contact us.',
          subsections: [
            {
              title: 'Privacy Team',
              content: 'Email: business@rental-discounts.com'
            },
            {
              title: 'Data Protection Officer',
              content: 'Email: business@rental-discounts.com'
            }
          ]
        }
      ]
    },
    es: {
      title: 'Política de Privacidad y Política de Cookies',
      lastUpdated: 'Última actualización: Diciembre 2024',
      sections: [
        {
          title: 'Información que Recopilamos',
          content: 'Recopilamos información que nos proporciona directamente, como cuando busca alquiler de coches, incluyendo ubicaciones de recogida y entrega, fechas y horarios. También recopilamos información sobre su dispositivo y patrones de uso.',
          subsections: [
            {
              title: 'Información Personal',
              content: 'Nombre, dirección de correo electrónico, número de teléfono, datos de ubicación, preferencias de búsqueda y cualquier otra información que elija proporcionar.'
            },
            {
              title: 'Información del Dispositivo',
              content: 'Dirección IP, tipo de navegador, sistema operativo, identificadores del dispositivo e información técnica sobre su dispositivo y conexión.'
            },
            {
              title: 'Información de Uso',
              content: 'Consultas de búsqueda, páginas visitadas, tiempo dedicado a las páginas, enlaces en los que se hace clic y otras interacciones con nuestro servicio.'
            }
          ]
        },
        {
          title: 'Cómo Usamos su Información',
          content: 'Utilizamos la información que recopilamos para proporcionar, mantener y mejorar nuestros servicios, procesar sus búsquedas de alquiler de coches y comunicarnos con usted sobre nuestros servicios.',
          subsections: [
            {
              title: 'Provisión de Servicios',
              content: 'Para proporcionar servicios de comparación de alquiler de coches, procesar búsquedas y entregar resultados relevantes.'
            },
            {
              title: 'Comunicación',
              content: 'Para enviarle actualizaciones del servicio, responder a consultas y proporcionar soporte al cliente.'
            },
            {
              title: 'Mejora',
              content: 'Para analizar patrones de uso, mejorar nuestros servicios y desarrollar nuevas funciones.'
            },
            {
              title: 'Cumplimiento Legal',
              content: 'Para cumplir con las leyes, regulaciones y procesos legales aplicables.'
            }
          ]
        },
        {
          title: 'Compartir Información',
          content: 'No vendemos, intercambiamos o transferimos su información personal a terceros sin su consentimiento, excepto como se describe en esta política o según lo requiera la ley.',
          subsections: [
            {
              title: 'Proveedores de Servicios',
              content: 'Podemos compartir información con proveedores de servicios de terceros de confianza que nos ayudan a operar nuestro sitio web y proporcionar servicios.'
            },
            {
              title: 'Requisitos Legales',
              content: 'Podemos divulgar información cuando lo requiera la ley, orden judicial o solicitud gubernamental.'
            },
            {
              title: 'Transferencias Comerciales',
              content: 'En caso de fusión, adquisición o venta de activos, su información puede ser transferida como parte de la transacción comercial.'
            }
          ]
        },
        {
          title: 'Seguridad de Datos',
          content: 'Implementamos medidas de seguridad apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.',
          subsections: [
            {
              title: 'Safeguards Técnicos',
              content: 'Cifrado, servidores seguros, firewalls y otras medidas técnicas para proteger los datos.'
            },
            {
              title: 'Controles de Acceso',
              content: 'Acceso limitado a la información personal sobre una base de necesidad de conocer.'
            },
            {
              title: 'Monitoreo Regular',
              content: 'Monitoreo continuo y evaluaciones de seguridad regulares de nuestros sistemas.'
            }
          ]
        },
        {
          title: 'Política de Cookies',
          content: 'Utilizamos cookies y tecnologías de seguimiento similares para mejorar su experiencia, analizar patrones de uso y proporcionar contenido personalizado.',
          subsections: [
            {
              title: 'Qué Son las Cookies',
              content: 'Las cookies son pequeños archivos de texto almacenados en su dispositivo que nos ayudan a recordar sus preferencias y proporcionar una mejor experiencia de usuario.'
            },
            {
              title: 'Tipos de Cookies que Usamos',
              content: 'Cookies necesarias (esenciales para la funcionalidad del sitio web), cookies analíticas (para entender el uso), cookies de marketing (para contenido personalizado) y cookies de preferencias (para recordar sus elecciones).'
            },
            {
              title: 'Cookies de Terceros',
              content: 'Podemos usar servicios de terceros que colocan cookies en su dispositivo, como Google Analytics para análisis del sitio web y socios publicitarios para contenido relevante.'
            },
            {
              title: 'Gestionar Cookies',
              content: 'Puede controlar y gestionar las cookies a través de la configuración de su navegador. Sin embargo, deshabilitar ciertas cookies puede afectar la funcionalidad de nuestro sitio web.'
            }
          ]
        },
        {
          title: 'Retención de Datos',
          content: 'Conservamos su información personal durante el tiempo necesario para proporcionar nuestros servicios y cumplir con los propósitos descritos en esta política.',
          subsections: [
            {
              title: 'Períodos de Retención',
              content: 'Datos de cuenta: hasta la eliminación de la cuenta; Datos de uso: 2 años; Datos de marketing: hasta la retirada del consentimiento; Requisitos legales: según lo requiera la ley aplicable.'
            },
            {
              title: 'Eliminación de Datos',
              content: 'Puede solicitar la eliminación de su información personal en cualquier momento a través de nuestros controles de privacidad o contactándonos directamente.'
            }
          ]
        },
        {
          title: 'Sus Derechos',
          content: 'Tiene derecho a acceder, corregir o eliminar su información personal. También puede optar por no recibir ciertas comunicaciones y prácticas de recopilación de datos.',
          subsections: [
            {
              title: 'Acceso y Portabilidad',
              content: 'Solicitar una copia de sus datos personales en un formato portable.'
            },
            {
              title: 'Corrección',
              content: 'Solicitar corrección de información personal inexacta o incompleta.'
            },
            {
              title: 'Eliminación',
              content: 'Solicitar eliminación de sus datos personales, sujeto a requisitos legales.'
            },
            {
              title: 'Opt-Out',
              content: 'Optar por no recibir comunicaciones de marketing y ciertas prácticas de recopilación de datos.'
            }
          ]
        },
        {
          title: 'Transferencias Internacionales de Datos',
          content: 'Su información puede ser transferida y procesada en países distintos al suyo. Nos aseguramos de que se implementen las salvaguardas apropiadas para dichas transferencias.',
          subsections: [
            {
              title: 'Ubicaciones de Transferencia',
              content: 'Los datos pueden ser procesados en los Estados Unidos, la Unión Europea y otros países donde operan nuestros proveedores de servicios.'
            },
            {
              title: 'Salvaguardas',
              content: 'We use standard contractual clauses, adequacy decisions, and other appropriate safeguards to protect your data during international transfers.'
            }
          ]
        },
        {
          title: 'Privacidad de los Niños',
          content: 'Nuestros servicios no están destinados a niños menores de 13 años. No recopilamos conscientemente información personal de niños menores de 13.',
          subsections: [
            {
              title: 'Verificación de Edad',
              content: 'Si es menor de 13, por favor no use nuestros servicios o proporcione cualquier información personal.'
            },
            {
              title: 'Parental Rights',
              content: 'If you believe we have collected information from a child under 13, please contact us immediately.'
            }
          ]
        },
        {
          title: 'Cambios a Esta Política',
          content: 'Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos de cualquier cambio material publicando la nueva política en esta página.',
          subsections: [
            {
              title: 'Notification',
              content: 'We will notify you of significant changes through email, website notice, or other appropriate means.'
            },
            {
              title: 'Continued Use',
              content: 'Your continued use of our services after changes become effective constitutes acceptance of the updated policy.'
            }
          ]
        },
        {
          title: 'Contact Us',
          content: 'If you have any questions about this Privacy Policy or our data practices, please contact us.',
          subsections: [
            {
              title: 'Privacy Team',
              content: 'Email: business@rental-discounts.com'
            },
            {
              title: 'Data Protection Officer',
              content: 'Email: business@rental-discounts.com'
            }
          ]
        }
      ]
    },
    pt: {
      title: 'Política de Privacidade e Política de Cookies',
      lastUpdated: 'Última atualização: Dezembro 2024',
      sections: [
        {
          title: 'Informações que Coletamos',
          content: 'Coletamos informações que você nos fornece diretamente, como quando você pesquisa aluguel de carros, incluindo locais de retirada e devolução, datas e horários. Também coletamos informações sobre seu dispositivo e padrões de uso.',
          subsections: [
            {
              title: 'Informações Pessoais',
              content: 'Nome, endereço de e-mail, número de telefone, dados de localização, preferências de pesquisa e qualquer outra informação que você escolha fornecer.'
            },
            {
              title: 'Informações do Dispositivo',
              content: 'Endereço IP, tipo de navegador, sistema operacional, identificadores do dispositivo e informações técnicas sobre seu dispositivo e conexão.'
            },
            {
              title: 'Informações de Uso',
              content: 'Consultas de pesquisa, páginas visitadas, tempo gasto em páginas, links clicados e outras interações com nosso serviço.'
            }
          ]
        },
        {
          title: 'Como Usamos suas Informações',
          content: 'Usamos as informações que coletamos para fornecer, manter e melhorar nossos serviços, processar suas pesquisas de aluguel de carros e nos comunicar com você sobre nossos serviços.',
          subsections: [
            {
              title: 'Provisão de Serviços',
              content: 'Para fornecer serviços de comparação de aluguel de carros, processar pesquisas e entregar resultados relevantes.'
            },
            {
              title: 'Comunicação',
              content: 'Para enviar atualizações de serviço, responder a consultas e fornecer suporte ao cliente.'
            },
            {
              title: 'Melhoria',
              content: 'Para analisar padrões de uso, melhorar nossos serviços e desenvolver novas funcionalidades.'
            },
            {
              title: 'Cumprimento Legal',
              content: 'Para cumprir com as leis, regulamentos e processos legais aplicáveis.'
            }
          ]
        },
        {
          title: 'Compartilhamento de Informações',
          content: 'Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros sem seu consentimento, exceto conforme descrito nesta política ou conforme exigido por lei.',
          subsections: [
            {
              title: 'Provedores de Serviços',
              content: 'Podemos compartilhar informações com provedores de serviços de terceiros confiáveis que nos ajudam a operar nosso site web e fornecer serviços.'
            },
            {
              title: 'Requisitos Legais',
              content: 'Podemos divulgar informações quando exigido pela lei, ordem judicial ou solicitação governamental.'
            },
            {
              title: 'Transferências Comerciais',
              content: 'Em caso de fusão, aquisição ou venda de ativos, suas informações podem ser transferidas como parte da transação comercial.'
            }
          ]
        },
        {
          title: 'Segurança de Dados',
          content: 'Implementamos medidas de segurança apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.',
          subsections: [
            {
              title: 'Safeguards Técnicos',
              content: 'Criptografia, servidores seguros, firewalls e outras medidas técnicas para proteger dados.'
            },
            {
              title: 'Controles de Acesso',
              content: 'Acesso limitado às informações pessoais sobre uma base de necessidade de conhecimento.'
            },
            {
              title: 'Monitoreo Regular',
              content: 'Monitoreo contínuo e avaliações regulares de segurança de nossos sistemas.'
            }
          ]
        },
        {
          title: 'Política de Cookies',
          content: 'Usamos cookies e tecnologias de rastreamento similares para melhorar sua experiência, analisar padrões de uso e fornecer conteúdo personalizado.',
          subsections: [
            {
              title: 'O que São Cookies',
              content: 'Cookies são pequenos arquivos de texto armazenados em seu dispositivo que nos ajudam a lembrar suas preferências e proporcionar uma melhor experiência de usuário.'
            },
            {
              title: 'Tipos de Cookies que Usamos',
              content: 'Cookies necessárias (essenciais para a funcionalidade do site web), cookies analíticas (para entender o uso), cookies de marketing (para conteúdo personalizado) e cookies de preferências (para lembrar suas escolhas).'
            },
            {
              title: 'Cookies de Terceiros',
              content: 'Podemos usar serviços de terceiros que colocam cookies em seu dispositivo, como Google Analytics para análise do site web e parceiros publicitários para conteúdo relevante.'
            },
            {
              title: 'Gerenciamento de Cookies',
              content: 'Você pode controlar e gerenciar cookies através das configurações do seu navegador. No entanto, desabilitar certos cookies pode afetar a funcionalidade do nosso site web.'
            }
          ]
        },
        {
          title: 'Retenção de Dados',
          content: 'Conservamos suas informações pessoais durante o tempo necessário para fornecer nossos serviços e cumprir com os propósitos descritos nesta política.',
          subsections: [
            {
              title: 'Períodos de Retenção',
              content: 'Dados da conta: até a exclusão da conta; Dados de uso: 2 anos; Dados de marketing: até a retirada do consentimento; Requisitos legais: conforme exigido pela lei aplicável.'
            },
            {
              title: 'Exclusão de Dados',
              content: 'Você pode solicitar a exclusão de suas informações pessoais a qualquer momento através de nossos controles de privacidade ou contatando-nos diretamente.'
            }
          ]
        },
        {
          title: 'Seus Direitos',
          content: 'Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você também pode optar por não receber certas comunicações e práticas de coleta de dados.',
          subsections: [
            {
              title: 'Acesso e Portabilidade',
              content: 'Solicite uma cópia de seus dados pessoais em um formato portátil.'
            },
            {
              title: 'Correção',
              content: 'Solicite correção de informações pessoais imprecise ou incompletas.'
            },
            {
              title: 'Exclusão',
              content: 'Solicite a exclusão de seus dados pessoais, sujeito a requisitos legais.'
            },
            {
              title: 'Opt-Out',
              content: 'Optar por não receber comunicações de marketing e certas práticas de coleta de dados.'
            }
          ]
        },
        {
          title: 'Transferências Internacionais de Dados',
          content: 'Sua informação pode ser transferida e processada em países diferentes do seu. Nos certificamos de que as salvaguardas apropriadas sejam implementadas para tais transferências.',
          subsections: [
            {
              title: 'Ubicaciones de Transferencia',
              content: 'Os dados podem ser processados nos Estados Unidos, União Europeia e outros países onde nossos provedores de serviços operam.'
            },
            {
              title: 'Salvaguardes',
              content: 'Utilizamos cláusulas contratuais padrão, decisões de adequação e outras salvaguardes apropriadas para proteger seus dados durante as transferências internacionais.'
            }
          ]
        },
        {
          title: 'Privacidade de Crianças',
          content: 'Nossos serviços não são destinados a crianças menores de 13 anos. Não coletamos conscientemente informações pessoais de crianças menores de 13 anos.',
          subsections: [
            {
              title: 'Verificação de Idade',
              content: 'Se você tem menos de 13 anos, por favor, não use nossos serviços ou forneça qualquer informação pessoal.'
            },
            {
              title: 'Direitos dos Pais',
              content: 'Se você acredita que coletamos informações de uma criança menor de 13 anos, entre em contato conosco imediatamente.'
            }
          ]
        },
        {
          title: 'Alterações a Esta Política',
          content: 'Podemos atualizar esta Política de Privacidade de tempos em tempos. Notificaremos você de qualquer alteração material publicando a nova política nesta página.',
          subsections: [
            {
              title: 'Notificação',
              content: 'Notificaremos de mudanças significativas através de e-mail, aviso do site web ou outros meios apropriados.'
            },
            {
              title: 'Uso Continuado',
              content: 'Seu uso contínuo de nossos serviços após a mudança tornar-se efetivo constitui aceitação da política atualizada.'
            }
          ]
        },
        {
          title: 'Entre em Contato',
          content: 'Se você tiver alguma dúvida sobre esta Política de Privacidade ou nossas práticas de dados, entre em contato conosco.',
          subsections: [
            {
              title: 'Equipe de Privacidade',
              content: 'E-mail: business@rental-discounts.com'
            },
            {
              title: 'Oficial de Proteção de Dados',
              content: 'E-mail: business@rental-discounts.com'
            }
          ]
        }
      ]
    },
    it: {
      title: 'Informativa sulla Privacy e Informativa sulla Cookie',
      lastUpdated: 'Ultimo aggiornamento: Dicembre 2024',
      sections: [
        {
          title: 'Informazioni che Raccogliamo',
          content: 'Raccogliamo informazioni che ci fornisci direttamente, come quando cerchi noleggi auto, inclusi luoghi di ritiro e consegna, date e orari. Raccogliamo anche informazioni sul tuo dispositivo e sui pattern di utilizzo.',
          subsections: [
            {
              title: 'Informazioni Personali',
              content: 'Nome, indirizzo email, numero di telefono, dati di localizzazione, preferenze di ricerca e qualsiasi altra informazione che decida di fornire.'
            },
            {
              title: 'Informazioni sul Dispositivo',
              content: 'Indirizzo IP, tipo di browser, sistema operativo, identificatori del dispositivo e informazioni tecniche sul tuo dispositivo e la connessione.'
            },
            {
              title: 'Informazioni di Uso',
              content: 'Consultazioni di ricerca, pagine visitate, tempo trascorso nelle pagine, collegamenti cliccati e altre interazioni con il nostro servizio.'
            }
          ]
        },
        {
          title: 'Come Utilizziamo le Tue Informazioni',
          content: 'Utilizziamo le informazioni che raccogliamo per fornire, mantenere e migliorare i nostri servizi, elaborare le tue ricerche di noleggio auto e comunicare con te sui nostri servizi.',
          subsections: [
            {
              title: 'Provisione di Servizi',
              content: 'Per fornire servizi di confronto noleggi auto, elaborare ricerche e fornire risultati pertinenti.'
            },
            {
              title: 'Comunicazione',
              content: 'Per inviarti aggiornamenti del servizio, rispondere a domande e fornire assistenza al cliente.'
            },
            {
              title: 'Miglioramento',
              content: 'Per analizzare i pattern di utilizzo, migliorare i nostri servizi e sviluppare nuove funzionalità.'
            },
            {
              title: 'Cumplimento Legale',
              content: 'Per rispettare le leggi, regolamenti e processi legali applicabili.'
            }
          ]
        },
        {
          title: 'Condivisione delle Informazioni',
          content: 'Non vendiamo, scambiamo o trasferiamo le tue informazioni personali a terzi senza il tuo consenso, eccetto come descritto in questa informativa o richiesto dalla legge.',
          subsections: [
            {
              title: 'Proveditori di Servizi',
              content: 'Potremmo condividere le informazioni con fornitori di servizi di terze parti fidati che ci aiutano a operare il nostro sito web e fornire servizi.'
            },
            {
              title: 'Requisiti Legali',
              content: 'Potremmo divulgar le informazioni quando richiesto dalla legge, ordine giudiziale o richiesta governativa.'
            },
            {
              title: 'Trasferimenti Commerciali',
              content: 'In caso di fusione, acquisizione o vendita di attività, le tue informazioni potrebbero essere trasferite come parte della transazione commerciale.'
            }
          ]
        },
        {
          title: 'Sicurezza dei Dati',
          content: 'Implementiamo misure di sicurezza appropriate per proteggere le tue informazioni personali da accesso non autorizzato, alterazione, divulgazione o distruzione.',
          subsections: [
            {
              title: 'Safeguards Técnicos',
              content: 'Cifratura, server sicuri, firewall e altre misure tecniche per proteggere i dati.'
            },
            {
              title: 'Controlli di Accesso',
              content: 'Accesso limitato alle informazioni personali su base di necessità di conoscenza.'
            },
            {
              title: 'Monitoreo Regolare',
              content: 'Monitoraggio continuo e valutazioni regolari di sicurezza dei nostri sistemi.'
            }
          ]
        },
        {
          title: 'Informativa sulla Cookie',
          content: 'Utilizziamo cookie e tecnologie di tracciamento simili per migliorare la tua esperienza, analizzare i pattern di utilizzo e fornire contenuti personalizzati.',
          subsections: [
            {
              title: 'Che cosa sono i Cookie',
              content: 'I cookie sono piccoli file di testo memorizzati sul tuo dispositivo che ci aiutano a ricordare le tue preferenze e fornire una migliore esperienza utente.'
            },
            {
              title: 'Tipi di Cookie che Utilizziamo',
              content: 'Cookie necessari (essenziali per la funzionalità del sito web), cookie analitici (per comprendere l\'uso), cookie di marketing (per contenuti personalizzati) e cookie di preferenze (per ricordare le tue scelte).'
            },
            {
              title: 'Cookie di Terzi',
              content: 'Potremmo utilizzare servizi di terze parti che mettono cookie sul tuo dispositivo, come Google Analytics per l\'analisi del sito web e partner pubblicitari per contenuti pertinenti.'
            },
            {
              title: 'Gestione dei Cookie',
              content: 'Puoi controllare e gestire i cookie attraverso le impostazioni del tuo browser. Tuttavia, disabilitare certi cookie può influire sulla funzionalità del nostro sito web.'
            }
          ]
        },
        {
          title: 'Retenzione dei Dati',
          content: 'Conserviamo le tue informazioni personali per il tempo necessario per fornire i nostri servizi e per perseguire gli scopi descritti in questa informativa.',
          subsections: [
            {
              title: 'Periodi di Retenzione',
              content: 'Dati dell\'account: fino alla cancellazione dell\'account; Dati di utilizzo: 2 anni; Dati di marketing: fino al ritiro del consenso; Requisiti legali: conformemente richiesto dalla legge applicabile.'
            },
            {
              title: 'Cancellazione dei Dati',
              content: 'Puoi richiedere la cancellazione delle tue informazioni personali in qualsiasi momento attraverso i nostri controlli di privacy o contattandoci direttamente.'
            }
          ]
        },
        {
          title: 'I Tuoi Diritti',
          content: 'Hai il diritto di accedere, correggere o eliminare le tue informazioni personali. Puoi anche rinunciare a determinate comunicazioni e pratiche di raccolta dati.',
          subsections: [
            {
              title: 'Accesso e Portabilità',
              content: 'Richiedi una copia dei tuoi dati personali in un formato portatile.'
            },
            {
              title: 'Correzione',
              content: 'Richiedi la correzione di informazioni personali imprecise o incomplete.'
            },
            {
              title: 'Eliminazione',
              content: 'Richiedi l\'eliminazione dei tuoi dati personali, soggetta a requisiti legali.'
            },
            {
              title: 'Opt-Out',
              content: 'Rinunciare a determinate comunicazioni e pratiche di raccolta dati.'
            }
          ]
        },
        {
          title: 'Transferimenti Internazionali di Dati',
          content: 'Le tue informazioni possono essere trasferite e processate in paesi diversi dal tuo. Ci assicuriamo che le salvaguardie appropriate siano implementate per tali trasferimenti.',
          subsections: [
            {
              title: 'Ubicaciones de Transferencia',
              content: 'I dati possono essere processati negli Stati Uniti, Unione Europea e altri paesi dove i nostri fornitori di servizi operano.'
            },
            {
              title: 'Salvaguardie',
              content: 'Utilizziamo clausole contrattuali standard, decisioni di adeguatezza e altre salvaguardie appropriate per proteggere i tuoi dati durante i trasferimenti internazionali.'
            }
          ]
        },
        {
          title: 'Privacità dei Bambini',
          content: 'I nostri servizi non sono destinati ai bambini di meno di 13 anni. Non coletiamo in modo consapevole informazioni personali di bambini di meno di 13 anni.',
          subsections: [
            {
              title: 'Verifica di Età',
              content: 'Se hai meno di 13 anni, per favore, non usi i nostri servizi o fornisci alcuna informazione personale.'
            },
            {
              title: 'Diritti dei Genitori',
              content: 'Se credi che abbiamo raccolto informazioni da un bambino di meno di 13 anni, contattaci immediatamente.'
            }
          ]
        },
        {
          title: 'Modifiche a questa Informativa',
          content: 'Aggiorniamo periodicamente questa Informativa sulla Privacy. Vi notificheremo di qualsiasi modifica materiale pubblicando la nuova informativa su questa pagina.',
          subsections: [
            {
              title: 'Notifica',
              content: 'Vi notificheremo di modifiche significative attraverso e-mail, avviso del sito web o altri mezzi appropriati.'
            },
            {
              title: 'Uso Continuato',
              content: 'Il tuo uso continuo dei nostri servizi dopo che le modifiche diventano effettive costituisce l\'accettazione della nuova informativa.'
            }
          ]
        },
        {
          title: 'Contattaci',
          content: 'Se hai domande su questa Informativa sulla Privacy o le nostre pratiche di dati, contattaci a business@rental-discounts.com.',
          subsections: [
            {
              title: 'Equipe di Privacità',
              content: 'E-mail: business@rental-discounts.com'
            },
            {
              title: 'DPO',
              content: 'E-mail: business@rental-discounts.com'
            }
          ]
        }
      ]
    },
    fr: {
      title: 'Politique de Confidentialité et Politique de Cookies',
      lastUpdated: 'Dernière mise à jour : Décembre 2024',
      sections: [
        {
          title: 'Informations que Nous Collectons',
          content: 'Nous collectons les informations que vous nous fournissez directement, comme lorsque vous recherchez des locations de voitures, y compris les lieux de prise en charge et de retour, les dates et heures. Nous collectons également des informations sur votre appareil et vos habitudes d\'utilisation.',
          subsections: [
            {
              title: 'Informations Personnelles',
              content: 'Nom, adresse email, numéro de téléphone, données de localisation, préférences de recherche et toute autre information que vous choisissez de fournir.'
            },
            {
              title: 'Informations sur le Dispositif',
              content: 'Adresse IP, type de navigateur, système d\'exploitation, identifiants du dispositif et informations techniques sur votre dispositif et votre connexion.'
            },
            {
              title: 'Informations d\'Utilisation',
              content: 'Requêtes de recherche, pages visitées, temps passé sur les pages, liens cliqués et autres interactions avec notre service.'
            }
          ]
        },
        {
          title: 'Comment Nous Utilisons Vos Informations',
          content: 'Nous utilisons les informations que nous collectons pour fournir, maintenir et améliorer nos services, traiter vos recherches de location de voitures et communiquer avec vous sur nos services.',
          subsections: [
            {
              title: 'Fourniture de Services',
              content: 'Pour fournir des services de comparaison de location de voitures, traiter les recherches et fournir des résultats pertinents.'
            },
            {
              title: 'Communication',
              content: 'Pour vous envoyer des mises à jour de service, répondre à des questions et fournir un support client.'
            },
            {
              title: 'Amélioration',
              content: 'Pour analyser les patterns d\'utilisation, améliorer nos services et développer de nouvelles fonctionnalités.'
            },
            {
              title: 'Cumpliment des Obligations Légales',
              content: 'Pour respecter les lois, règlements et processus légaux applicables.'
            }
          ]
        },
        {
          title: 'Partage d\'Informations',
          content: 'Nous ne vendons, n\'échangeons ni ne transférons vos informations personnelles à des tiers sans votre consentement, sauf comme décrit dans cette politique ou comme requis par la loi.',
          subsections: [
            {
              title: 'Fournisseurs de Services',
              content: 'Nous pouvons partager des informations avec des fournisseurs de services de tiers de confiance qui nous aident à opérer notre site web et à fournir des services.'
            },
            {
              title: 'Exigences Légales',
              content: 'Nous pouvons divulguer des informations lorsqu\'elles sont exigées par la loi, une ordonnance judiciaire ou une demande gouvernementale.'
            },
            {
              title: 'Transferts d\'Entreprises',
              content: 'En cas de fusion, d\'acquisition ou de vente d\'actifs, vos informations peuvent être transférées comme partie de la transaction commerciale.'
            }
          ]
        },
        {
          title: 'Sécurité des Données',
          content: 'Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l\'accès non autorisé, l\'altération, la divulgation ou la destruction.',
          subsections: [
            {
              title: 'Safeguards Techniques',
              content: 'Chiffrement, serveurs sécurisés, pare-feu et autres mesures techniques pour protéger les données.'
            },
            {
              title: 'Contrôles d\'Accès',
              content: 'Accès limité aux informations personnelles sur la base de la nécessité de connaître.'
            },
            {
              title: 'Surveillance Régulière',
              content: 'Surveillance continue et évaluations régulières de la sécurité de nos systèmes.'
            }
          ]
        },
        {
          title: 'Politique de Cookies',
          content: 'Nous utilisons des cookies et des technologies de suivi similaires pour améliorer votre expérience, analyser les habitudes d\'utilisation et fournir du contenu personnalisé.',
          subsections: [
            {
              title: 'Qu\'est-ce que sont les Cookies',
              content: 'Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à nous souvenir de vos préférences et à vous offrir une meilleure expérience utilisateur.'
            },
            {
              title: 'Types de Cookies que Nous Utilisons',
              content: 'Cookies nécessaires (essentiels pour la fonctionnalité du site web), cookies analytiques (pour comprendre l\'utilisation), cookies de marketing (pour le contenu personnalisé) et cookies de préférences (pour vous souvenir de vos choix).'
            },
            {
              title: 'Cookies de Tierces Parties',
              content: 'Nous pouvons utiliser des services de tiers qui placent des cookies sur votre appareil, comme Google Analytics pour l\'analyse du site web et des partenaires publicitaires pour le contenu pertinent.'
            },
            {
              title: 'Gestion des Cookies',
              content: 'Vous pouvez contrôler et gérer les cookies via les paramètres de votre navigateur. Cependant, le désactivation de certains cookies peut affecter la fonctionnalité de notre site web.'
            }
          ]
        },
        {
          title: 'Retention des Données',
          content: 'Nous conservons vos informations personnelles pendant le temps nécessaire pour fournir nos services et pour accomplir les objectifs décrits dans cette politique.',
          subsections: [
            {
              title: 'Périodes de Retention',
              content: 'Données de compte: jusqu\'à la suppression du compte; Données d\'utilisation: 2 ans; Données de marketing: jusqu\'à la retraite du consentement; Exigences légales: conformément aux exigences légales applicables.'
            },
            {
              title: 'Suppression des Données',
              content: 'Vous pouvez demander la suppression de vos informations personnelles à tout moment via nos contrôles de confidentialité ou en nous contactant directement.'
            }
          ]
        },
        {
          title: 'Vos Droits',
          content: 'Vous avez le droit d\'accéder, de corriger ou de supprimer vos informations personnelles. Vous pouvez également vous désabonner de certaines communications et pratiques de collecte de données.',
          subsections: [
            {
              title: 'Accès et Portabilité',
              content: 'Demandez une copie de vos données personnelles dans un format portable.'
            },
            {
              title: 'Correction',
              content: 'Demandez la correction de vos informations personnelles inexactes ou incomplètes.'
            },
            {
              title: 'Suppression',
              content: 'Demandez la suppression de vos données personnelles, sous réserve des exigences légales.'
            },
            {
              title: 'Opt-Out',
              content: 'Vous pouvez vous désabonner des communications de marketing et certaines pratiques de collecte de données.'
            }
          ]
        },
        {
          title: 'Transferts Internationaux de Données',
          content: 'Vos informations peuvent être transférées et traitées dans des pays différents de votre propre. Nous nous assurons que les mesures de sécurité appropriées sont mises en œuvre pour de telles transférences.',
          subsections: [
            {
              title: 'Ubicaciones de Transferencia',
              content: 'Les données peuvent être traitées aux États-Unis, à l\'Union européenne et dans d\'autres pays où nos fournisseurs de services opèrent.'
            },
            {
              title: 'Salvaguardes',
              content: 'Nous utilisons des clauses contractuelles standard, des décisions d\'adéquation et d\'autres mesures de sécurité appropriées pour protéger vos données lors des transferts internationaux.'
            }
          ]
        },
        {
          title: 'Privacité des Enfants',
          content: 'Nos services ne sont pas destinés aux enfants de moins de 13 ans. Nous ne collectons pas de manière consciente des informations personnelles d\'enfants de moins de 13 ans.',
          subsections: [
            {
              title: 'Vérification d\'Âge',
              content: 'Si vous avez moins de 13 ans, veuillez ne pas utiliser nos services ou fournir aucune information personnelle.'
            },
            {
              title: 'Droits des Parents',
              content: 'Si vous croyez que nous avons collecté des informations d\'un enfant de moins de 13 ans, veuillez nous contacter immédiatement.'
            }
          ]
        },
        {
          title: 'Modifications à cette Politique',
          content: 'Nous pouvons mettre à jour cette Politique de Confidentialité de temps en temps. Nous vous informerons de tout changement significatif en publiant la nouvelle politique sur cette page.',
          subsections: [
            {
              title: 'Notification',
              content: 'Nous vous informerons des changements significatifs par e-mail, avis du site web ou d\'autres moyens appropriés.'
            },
            {
              title: 'Utilisation Continue',
              content: 'Votre utilisation continue de nos services après que les changements prennent effet constitue l\'acceptation de la nouvelle politique.'
            }
          ]
        },
        {
          title: 'Nous Contacter',
          content: 'Si vous avez des questions sur cette Politique de Confidentialité ou nos pratiques de données, contactez-nous à business@rental-discounts.com.',
          subsections: [
            {
              title: 'Equipe de Confidentialité',
              content: 'E-mail: business@rental-discounts.com'
            },
            {
              title: 'DPO',
              content: 'E-mail: business@rental-discounts.com'
            }
          ]
        }
      ]
    },
    de: {
      title: 'Datenschutzerklärung und Cookie-Richtlinie',
      lastUpdated: 'Zuletzt aktualisiert: Dezember 2024',
      sections: [
        {
          title: 'Informationen, die Wir Sammeln',
          content: 'Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, wie z.B. wenn Sie nach Autovermietungen suchen, einschließlich Abhol- und Rückgabeorten, Daten und Zeiten. Wir sammeln auch Informationen über Ihr Gerät und Nutzungsmuster.',
          subsections: [
            {
              title: 'Personenbezogene Informationen',
              content: 'Name, E-Mail-Adresse, Telefonnummer, Standortdaten, Suchpräferenzen und jede andere Information, die Sie uns freiwillig zur Verfügung stellen.'
            },
            {
              title: 'Geräteinformationen',
              content: 'IP-Adresse, Browser-Typ, Betriebssystem, Geräte-Identifikatoren und technische Informationen über Ihr Gerät und Ihre Verbindung.'
            },
            {
              title: 'Nutzungsdaten',
              content: 'Suchanfragen, besuchte Seiten, aufgewendete Zeit, angeklickte Links und andere Interaktionen mit unserem Service.'
            }
          ]
        },
        {
          title: 'Wie Wir Ihre Informationen Verwenden',
          content: 'Wir verwenden die gesammelten Informationen, um unsere Dienste bereitzustellen, zu warten und zu verbessern, Ihre Autovermietungssuchen zu verarbeiten und mit Ihnen über unsere Dienste zu kommunizieren.',
          subsections: [
            {
              title: 'Dienstleistungsversorgung',
              content: 'Um Autovermietungskomparisdienste bereitzustellen, Suchen zu verarbeiten und relevante Ergebnisse zu liefern.'
            },
            {
              title: 'Kommunikation',
              content: 'Um Ihnen Service-Updates zu senden, Anfragen zu beantworten und Kundensupport zu gewährleisten.'
            },
            {
              title: 'Verbesserung',
              content: 'Um Nutzungsmuster zu analysieren, unsere Dienste zu verbessern und neue Funktionen zu entwickeln.'
            },
            {
              title: 'Rechtliches Verhalten',
              content: 'Um Gesetze, Vorschriften und rechtliche Prozesse einzuhalten.'
            }
          ]
        },
        {
          title: 'Weitergabe von Informationen',
          content: 'Wir verkaufen, tauschen oder übertragen Ihre persönlichen Informationen nicht an Dritte ohne Ihre Zustimmung, außer wie in dieser Richtlinie beschrieben oder gesetzlich vorgeschrieben.',
          subsections: [
            {
              title: 'Dienstleister',
              content: 'Wir können Informationen mit vertrauenswürdigen Drittanbietern teilen, die unseren Website-Betrieb und die Bereitstellung von Diensten unterstützen.'
            },
            {
              title: 'Rechtliche Anforderungen',
              content: 'Wir können Informationen offenlegen, wenn dies gesetzlich vorgeschrieben ist, eine Gerichtsentscheidung oder eine staatliche Anfrage erfordert.'
            },
            {
              title: 'Geschäftsübertragungen',
              content: 'Im Falle einer Fusion, Übernahme oder eines Vermögensverkaufs werden Ihre Informationen als Teil der Geschäftsübertragung übertragen.'
            }
          ]
        },
        {
          title: 'Datensicherheit',
          content: 'Wir implementieren angemessene Sicherheitsmaßnahmen, um Ihre persönlichen Informationen vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung zu schützen.',
          subsections: [
            {
              title: 'Technische Sicherheitsmaßnahmen',
              content: 'Verschlüsselung, sichere Server, Firewalls und andere technische Maßnahmen zur Datenschutz.'
            },
            {
              title: 'Zugriffssteuerungen',
              content: 'Eingeschränkter Zugriff auf personenbezogene Informationen auf Basis der Notwendigkeit zu wissen.'
            },
            {
              title: 'Regelmäßige Überwachung',
              content: 'Kontinuierliche Überwachung und regelmäßige Sicherheitsbewertungen unserer Systeme.'
            }
          ]
        },
        {
          title: 'Cookie-Richtlinie',
          content: 'Wir verwenden Cookies und ähnliche Tracking-Technologien, um Ihre Erfahrung zu verbessern, Nutzungsmuster zu analysieren und personalisierte Inhalte bereitzustellen.',
          subsections: [
            {
              title: 'Was sind Cookies',
              content: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden und uns helfen, Ihre Präferenzen zu merken und Ihnen eine bessere Benutzererfahrung zu bieten.'
            },
            {
              title: 'Arten von Cookies, die wir verwenden',
              content: 'Erforderliche Cookies (für die Website-Funktionalität unerlässlich), Analyse-Cookies (zum Verständnis des Nutzungsverhaltens), Marketing-Cookies (für personalisierte Inhalte) und Präferenz-Cookies (zum Erinnern Ihrer Entscheidungen).'
            },
            {
              title: 'Dritte-Party-Cookies',
              content: 'Wir können Drittanbieter-Dienste verwenden, die Cookies auf Ihrem Gerät platzieren, z.B. Google Analytics für Website-Analysen und Werbepartners für relevante Inhalte.'
            },
            {
              title: 'Verwaltung von Cookies',
              content: 'Sie können Cookies über die Einstellungen Ihres Browsers steuern. Es ist jedoch zu beachten, dass das Deaktivieren bestimmter Cookies die Funktionalität unserer Website beeinträchtigen kann.'
            }
          ]
        },
        {
          title: 'Datenaufbewahrung',
          content: 'Wir behalten Ihre personenbezogenen Informationen so lange, wie es für die Bereitstellung unserer Dienste und die Erfüllung der in dieser Richtlinie beschriebenen Zwecke erforderlich ist.',
          subsections: [
            {
              title: 'Aufbewahrungsfristen',
              content: 'Konto-Daten: bis zur Löschung des Kontos; Nutzungsdaten: 2 Jahre; Marketing-Daten: bis zum Widerruf des Einwilligungserklärungsrechts; Rechtliche Anforderungen: entsprechend den anwendbaren Rechtsvorschriften.'
            },
            {
              title: 'Datenlöschung',
              content: 'Sie können Ihre personenbezogenen Informationen jederzeit über unsere Privatsphäre-Steuerungen oder direkt an uns verlangen.'
            }
          ]
        },
        {
          title: 'Ihre Rechte',
          content: 'Sie haben das Recht, auf Ihre persönlichen Informationen zuzugreifen, sie zu korrigieren oder zu löschen. Sie können sich auch von bestimmten Kommunikationen und Datensammlungspraktiken abmelden.',
          subsections: [
            {
              title: 'Zugang und Portabilität',
              content: 'Fordern Sie eine Kopie Ihrer personenbezogenen Daten in einem portablen Format an.'
            },
            {
              title: 'Korrektur',
              content: 'Fordern Sie die Korrektur ungenauer oder unvollständiger personenbezogener Informationen an.'
            },
            {
              title: 'Löschung',
              content: 'Fordern Sie die Löschung Ihrer personenbezogenen Daten an, vorbehaltlich rechtlicher Anforderungen.'
            },
            {
              title: 'Opt-Out',
              content: 'Wenden Sie sich an, um Marketing-Kommunikationen und bestimmte Datensammlungspraktiken abzuschalten.'
            }
          ]
        },
        {
          title: 'Internationale Datenübertragungen',
          content: 'Ihre Informationen können in Länder übertragen und verarbeitet werden, die sich von Ihrem eigenen Land unterscheiden. Wir stellen sicher, dass angemessene Sicherheitsmaßnahmen für solche Übertragungen getroffen werden.',
          subsections: [
            {
              title: 'Übertragungsstandorte',
              content: 'Die Daten können in den Vereinigten Staaten, der Europäischen Union und anderen Ländern verarbeitet werden, in denen unsere Dienstleister ihren Sitz haben.'
            },
            {
              title: 'Sicherheitsmaßnahmen',
              content: 'Wir verwenden standardisierte Vertragsbestimmungen, angemessene Entscheidungen und andere angemessene Sicherheitsmaßnahmen, um Ihre Daten während internationaler Übertragungen zu schützen.'
            }
          ]
        },
        {
          title: 'Kinderschutz',
          content: 'Unsere Dienste sind nicht für Kinder unter 13 Jahren gedacht. Wir sammeln keine personenbezogenen Informationen von Kindern unter 13 Jahren bewusst.',
          subsections: [
            {
              title: 'Altersverifizierung',
              content: 'Wenn Sie unter 13 Jahren sind, verwenden Sie bitte unsere Dienste nicht oder geben Sie keine personenbezogenen Informationen an.'
            },
            {
              title: 'Rechte der Eltern',
              content: 'Wenn Sie der Ansicht sind, dass wir personenbezogene Informationen von einem Kind unter 13 Jahren gesammelt haben, wenden Sie sich bitte sofort an uns.'
            }
          ]
        },
        {
          title: 'Änderungen an dieser Richtlinie',
          content: 'Wir aktualisieren diese Datenschutzerklärung periodisch. Wir benachrichtigen Sie von wesentlichen Änderungen, indem wir die neue Richtlinie auf dieser Seite veröffentlichen.',
          subsections: [
            {
              title: 'Benachrichtigung',
              content: 'Wir benachrichtigen Sie von wesentlichen Änderungen über E-Mail, Website-Benachrichtigung oder andere geeignete Mittel.'
            },
            {
              title: 'Fortsetzung der Nutzung',
              content: 'Ihre Fortsetzung der Nutzung unserer Dienste nach der Wirksamwerdung der Änderungen stellt die Annahme der aktualisierten Richtlinie dar.'
            }
          ]
        },
        {
          title: 'Kontaktieren Sie Uns',
          content: 'Wenn Sie Fragen zu dieser Datenschutzerklärung oder unseren Datenpraktiken haben, kontaktieren Sie uns unter business@rental-discounts.com.',
          subsections: [
            {
              title: 'Datenschutzteam',
              content: 'E-Mail: business@rental-discounts.com'
            },
            {
              title: 'Datenschutzbeauftragter',
              content: 'E-Mail: business@rental-discounts.com'
            }
          ]
        }
      ]
    }
  };

  // Use fallback if content fails to load
  const currentContent = content[language as keyof typeof content] || content.en || fallbackContent;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link 
              to="/" 
              className="inline-flex items-center text-[#219f61] hover:text-[#1a7d4d] mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('backToHome') || 'Back to Home'}
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
              {currentContent.sections.map((section: any, index: number) => (
                <div key={index} className="mb-12">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {section.content}
                  </p>
                  
                  {section.subsections && (
                    <div className="ml-4 space-y-4">
                      {section.subsections.map((subsection: any, subIndex: number) => (
                        <div key={subIndex} className="border-l-4 border-green-200 pl-4">
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            {subsection.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {subsection.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
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

export default PrivacyPolicy;
