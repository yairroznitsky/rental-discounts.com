import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Download, Trash2, Edit, Eye, Shield, Mail } from 'lucide-react';

interface PrivacyControlsProps {
  userId?: string;
}

export const PrivacyControls: React.FC<PrivacyControlsProps> = ({ userId }) => {
  const { t, language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const content = {
    en: {
      title: 'Privacy Controls',
      subtitle: 'Manage your data and privacy preferences',
      dataRights: 'Your Data Rights',
      downloadData: 'Download My Data',
      downloadDesc: 'Get a copy of all your personal data in a portable format',
      deleteData: 'Delete My Data',
      deleteDesc: 'Permanently remove all your personal data from our systems',
      correctData: 'Correct My Data',
      correctDesc: 'Update or correct inaccurate personal information',
      marketingPrefs: 'Marketing Preferences',
      marketingDesc: 'Control how we use your data for marketing purposes',
      dataSharing: 'Data Sharing',
      dataSharingDesc: 'Manage how your data is shared with third parties',
      contactDPO: 'Contact Data Protection Officer',
      contactDPODesc: 'Get in touch with our privacy team for any concerns',
      processing: 'Data Processing',
      processingDesc: 'View what data we process and why',
      requestSent: 'Request sent successfully',
      requestFailed: 'Request failed. Please try again.',
      confirmDelete: 'Are you sure you want to delete all your data? This action cannot be undone.',
      cancel: 'Cancel',
      confirm: 'Confirm'
    },
    es: {
      title: 'Controles de Privacidad',
      subtitle: 'Gestiona tus datos y preferencias de privacidad',
      dataRights: 'Tus Derechos de Datos',
      downloadData: 'Descargar Mis Datos',
      downloadDesc: 'Obtén una copia de todos tus datos personales en formato portable',
      deleteData: 'Eliminar Mis Datos',
      deleteDesc: 'Elimina permanentemente todos tus datos personales de nuestros sistemas',
      correctData: 'Corregir Mis Datos',
      correctDesc: 'Actualiza o corrige información personal inexacta',
      marketingPrefs: 'Preferencias de Marketing',
      marketingDesc: 'Controla cómo usamos tus datos para fines de marketing',
      dataSharing: 'Compartir Datos',
      dataSharingDesc: 'Gestiona cómo se comparten tus datos con terceros',
      contactDPO: 'Contactar Oficial de Protección de Datos',
      contactDPODesc: 'Ponte en contacto con nuestro equipo de privacidad para cualquier consulta',
      processing: 'Procesamiento de Datos',
      processingDesc: 'Ver qué datos procesamos y por qué',
      requestSent: 'Solicitud enviada exitosamente',
      requestFailed: 'La solicitud falló. Por favor inténtalo de nuevo.',
      confirmDelete: '¿Estás seguro de que quieres eliminar todos tus datos? Esta acción no se puede deshacer.',
      cancel: 'Cancelar',
      confirm: 'Confirmar'
    },
    pt: {
      title: 'Controles de Privacidade',
      subtitle: 'Gerencie seus dados e preferências de privacidade',
      dataRights: 'Seus Direitos de Dados',
      downloadData: 'Baixar Meus Dados',
      downloadDesc: 'Obtenha uma cópia de todos os seus dados pessoais em formato portátil',
      deleteData: 'Excluir Meus Dados',
      deleteDesc: 'Exclua permanentemente todos os seus dados pessoais de nossos sistemas',
      correctData: 'Corrigir Meus Dados',
      correctDesc: 'Atualize ou corrija informações pessoais imprecisas',
      marketingPrefs: 'Preferências de Marketing',
      marketingDesc: 'Controle como usamos seus dados para fins de marketing',
      dataSharing: 'Compartilhamento de Dados',
      dataSharingDesc: 'Gerencie como seus dados são compartilhados com terceiros',
      contactDPO: 'Contatar Oficial de Proteção de Dados',
      contactDPODesc: 'Entre em contato com nossa equipe de privacidade para qualquer preocupação',
      processing: 'Processamento de Dados',
      processingDesc: 'Veja quais dados processamos e por quê',
      requestSent: 'Solicitação enviada com sucesso',
      requestFailed: 'A solicitação falhou. Por favor tente novamente.',
      confirmDelete: 'Tem certeza de que deseja excluir todos os seus dados? Esta ação não pode ser desfeita.',
      cancel: 'Cancelar',
      confirm: 'Confirmar'
    },
    it: {
      title: 'Controlli sulla Privacy',
      subtitle: 'Gestisci i tuoi dati e preferenze sulla privacy',
      dataRights: 'I Tuoi Diritti sui Dati',
      downloadData: 'Scarica i Miei Dati',
      downloadDesc: 'Ottieni una copia di tutti i tuoi dati personali in formato portatile',
      deleteData: 'Elimina i Miei Dados',
      deleteDesc: 'Elimina permanentemente tutti i tuoi dati personali dai nostri sistemi',
      correctData: 'Correggi i Miei Dati',
      correctDesc: 'Aggiorna o correggi informazioni personali inaccurate',
      marketingPrefs: 'Preferenze di Marketing',
      marketingDesc: 'Controlla come utilizziamo i tuoi dati per scopi di marketing',
      dataSharing: 'Condivisione Dati',
      dataSharingDesc: 'Gestisci come i tuoi dati vengono condivisi con terze parti',
      contactDPO: 'Contatta il Responsabile della Protezione dei Dati',
      contactDPODesc: 'Mettiti in contatto con il nostro team per la privacy per qualsiasi preoccupazione',
      processing: 'Elaborazione Dati',
      processingDesc: 'Visualizza quali dati elaboriamo e perché',
      requestSent: 'Richiesta inviata con successo',
      requestFailed: 'La richiesta è fallita. Riprova.',
      confirmDelete: 'Sei sicuro di voler eliminare tutti i tuoi dati? Questa azione non può essere annullata.',
      cancel: 'Annulla',
      confirm: 'Conferma'
    },
    fr: {
      title: 'Contrôles de Confidentialité',
      subtitle: 'Gérez vos données et préférences de confidentialité',
      dataRights: 'Vos Droits sur les Données',
      downloadData: 'Télécharger Mes Données',
      downloadDesc: 'Obtenez une copie de toutes vos données personnelles dans un format portable',
      deleteData: 'Supprimer Mes Données',
      deleteDesc: 'Supprimez définitivement toutes vos données personnelles de nos systèmes',
      correctData: 'Corriger Mes Données',
      correctDesc: 'Mettez à jour ou corrigez des informations personnelles inexactes',
      marketingPrefs: 'Préférences Marketing',
      marketingDesc: 'Contrôlez comment nous utilisons vos données à des fins marketing',
      dataSharing: 'Partage de Données',
      dataSharingDesc: 'Gérez comment vos données sont partagées avec des tiers',
      contactDPO: 'Contacter le Délégué à la Protection des Données',
      contactDPODesc: 'Contactez notre équipe confidentialité pour toute préoccupation',
      processing: 'Traitement des Données',
      processingDesc: 'Voir quelles données nous traitons et pourquoi',
      requestSent: 'Demande envoyée avec succès',
      requestFailed: 'La demande a échoué. Veuillez réessayer.',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action ne peut pas être annulée.',
      cancel: 'Annuler',
      confirm: 'Confirmer'
    },
    de: {
      title: 'Datenschutzkontrollen',
      subtitle: 'Verwalten Sie Ihre Daten und Datenschutzeinstellungen',
      dataRights: 'Ihre Datenrechte',
      downloadData: 'Meine Daten Herunterladen',
      downloadDesc: 'Erhalten Sie eine Kopie aller Ihrer persönlichen Daten in einem portablen Format',
      deleteData: 'Meine Daten Löschen',
      deleteDesc: 'Löschen Sie dauerhaft alle Ihre persönlichen Daten aus unseren Systemen',
      correctData: 'Meine Daten Korrigieren',
      correctDesc: 'Aktualisieren oder korrigieren Sie ungenaue persönliche Informationen',
      marketingPrefs: 'Marketing-Einstellungen',
      marketingDesc: 'Kontrollieren Sie, wie wir Ihre Daten für Marketing-Zwecke verwenden',
      dataSharing: 'Datenweitergabe',
      dataSharingDesc: 'Verwalten Sie, wie Ihre Daten an Dritte weitergegeben werden',
      contactDPO: 'Datenschutzbeauftragten Kontaktieren',
      contactDPODesc: 'Kontaktieren Sie unser Datenschutzteam bei Bedenken',
      processing: 'Datenverarbeitung',
      processingDesc: 'Sehen Sie, welche Daten wir verarbeiten und warum',
      requestSent: 'Anfrage erfolgreich gesendet',
      requestFailed: 'Anfrage fehlgeschlagen. Bitte versuchen Sie es erneut.',
      confirmDelete: 'Sind Sie sicher, dass Sie alle Ihre Daten löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      cancel: 'Abbrechen',
      confirm: 'Bestätigen'
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  const handleDataRequest = async (type: 'download' | 'delete' | 'correct') => {
    setIsLoading(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (type === 'delete') {
        const confirmed = window.confirm(currentContent.confirmDelete);
        if (!confirmed) {
          setIsLoading(false);
          return;
        }
      }

      setMessage(currentContent.requestSent);
      
      // In a real implementation, you would make an API call here
      console.log(`${type} data request for user:`, userId);
      
    } catch (error) {
      setMessage(currentContent.requestFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const privacyOptions = [
    {
      icon: Download,
      title: currentContent.downloadData,
      description: currentContent.downloadDesc,
      action: () => handleDataRequest('download'),
      color: 'bg-green-100 text-[#219f61]'
    },
    {
      icon: Trash2,
      title: currentContent.deleteData,
      description: currentContent.deleteDesc,
      action: () => handleDataRequest('delete'),
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Edit,
      title: currentContent.correctData,
      description: currentContent.correctDesc,
      action: () => handleDataRequest('correct'),
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Mail,
      title: currentContent.marketingPrefs,
      description: currentContent.marketingDesc,
      action: () => window.open('/contact-us', '_blank'),
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Shield,
      title: currentContent.dataSharing,
      description: currentContent.dataSharingDesc,
      action: () => window.open('/privacy-policy', '_blank'),
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Eye,
      title: currentContent.processing,
      description: currentContent.processingDesc,
      action: () => window.open('/privacy-policy', '_blank'),
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {currentContent.title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {currentContent.subtitle}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {currentContent.dataRights}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {privacyOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={option.action}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${option.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {option.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message === currentContent.requestSent 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#219f61]"></div>
        </div>
      )}

      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">
          Need help? <a href="/contact-us" className="text-[#219f61] hover:underline">Contact our privacy team</a>
        </p>
      </div>
    </div>
  );
};
