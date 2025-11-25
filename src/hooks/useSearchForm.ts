
import { useState, useEffect } from 'react';
import { useDateDefaults } from './useDateDefaults';
import { KayakLocation } from '@/types/location';

export const useSearchForm = () => {
  const { getPickupDate, getDropoffDate, defaultPickupTime, defaultDropoffTime } = useDateDefaults();
  
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [selectedPickupLocation, setSelectedPickupLocation] = useState<KayakLocation | null>(null);
  const [selectedDropoffLocation, setSelectedDropoffLocation] = useState<KayakLocation | null>(null);
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    pickupDate: getPickupDate(),
    dropoffDate: getDropoffDate(getPickupDate()),
    pickupTime: defaultPickupTime,
    dropoffTime: defaultDropoffTime
  });

  // Auto-sync dropoff location with pickup when toggle is off
  useEffect(() => {
    if (!differentDropoff) {
      setFormData(prev => ({ ...prev, dropoff: prev.pickup }));
    }
  }, [differentDropoff, formData.pickup]);

  const handleInputChange = (field: string, value: string) => {
    console.log('SearchForm: Input changed', { field, value });
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePickupDateChange = (value: string) => {
    console.log('SearchForm: Pickup date changed', value);

    // Guard: empty or invalid input
    if (!value) {
      setFormData(prev => ({ ...prev, pickupDate: '', dropoffDate: '' }));
      return;
    }

    // Safe parse YYYY-MM-DD to avoid mobile ISO quirks
    const parts = value.split('-').map(Number);
    const year = parts[0];
    const monthIndex = (parts[1] || 1) - 1; // 0-based month
    const day = parts[2] || 1;
    const pickupDate = new Date(year, monthIndex, day);

    if (isNaN(pickupDate.getTime())) {
      setFormData(prev => ({ ...prev, pickupDate: '', dropoffDate: '' }));
      return;
    }

    const dropoffDate = new Date(pickupDate);
    dropoffDate.setDate(pickupDate.getDate() + 1);

    const dropoffDateString = `${dropoffDate.getFullYear()}-${String(dropoffDate.getMonth() + 1).padStart(2, '0')}-${String(dropoffDate.getDate()).padStart(2, '0')}`;

    setFormData(prev => ({
      ...prev,
      pickupDate: value,
      dropoffDate: dropoffDateString
    }));
  };

  return {
    formData,
    differentDropoff,
    selectedPickupLocation,
    selectedDropoffLocation,
    setDifferentDropoff,
    setSelectedPickupLocation,
    setSelectedDropoffLocation,
    handleInputChange,
    handlePickupDateChange,
  };
};
