
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ClickableDatePicker } from '@/components/ui/clickable-date-picker';
import { TimePicker } from '@/components/ui/time-picker';
import { useLanguage } from '@/hooks/useLanguage';

interface DateTimeInputsProps {
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  onPickupDateChange: (value: string) => void;
  onInputChange: (field: string, value: string) => void;
  isDesktop?: boolean;
}

export const DateTimeInputs: React.FC<DateTimeInputsProps> = ({
  pickupDate,
  pickupTime,
  dropoffDate,
  dropoffTime,
  onPickupDateChange,
  onInputChange,
  isDesktop = false
}) => {
  const { t } = useLanguage();
  const suffix = isDesktop ? '' : '-mobile';
  const textSize = isDesktop ? 'text-xs' : 'text-sm';

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate minimum dropoff date (pickup date + 1 day)
  const getMinDropoffDate = () => {
    if (!pickupDate) return today;

    // Safely parse YYYY-MM-DD and construct date
    const parts = pickupDate.split('-').map(Number);
    const year = parts[0];
    const monthIndex = (parts[1] || 1) - 1; // 0-based month
    const day = parts[2] || 1;
    const pickup = new Date(year, monthIndex, day);

    if (isNaN(pickup.getTime())) return today;

    const minDropoff = new Date(pickup);
    minDropoff.setDate(pickup.getDate() + 1);
    const y = minDropoff.getFullYear();
    const m = String(minDropoff.getMonth() + 1).padStart(2, '0');
    const d = String(minDropoff.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  if (isDesktop) {
    return (
      <>
        {/* Pickup Date */}
        <div>
          <Label htmlFor="pickupDate" className="text-sm font-medium text-gray-700 mb-2 block">
            {t('pickupDate')}
          </Label>
          <ClickableDatePicker
            value={pickupDate}
            onChange={onPickupDateChange}
            min={today}
            className={`${textSize} font-medium`}
            placeholder={t('pickupDate')}
          />
        </div>

        {/* Pickup Time */}
        <div>
          <Label htmlFor="pickupTime" className="text-sm font-medium text-gray-700 mb-2 block">
            {t('pickupTime')}
          </Label>
          <TimePicker
            value={pickupTime}
            onChange={(time) => onInputChange('pickupTime', time)}
            className={`${textSize} font-medium`}
            placeholder={t('pickupTime')}
          />
        </div>

        {/* Dropoff Date */}
        <div>
          <Label htmlFor="dropoffDate" className="text-sm font-medium text-gray-700 mb-2 block">
            {t('dropoffDate')}
          </Label>
          <ClickableDatePicker
            value={dropoffDate}
            onChange={(date) => onInputChange('dropoffDate', date)}
            min={getMinDropoffDate()}
            className={`${textSize} font-medium`}
            placeholder={t('dropoffDate')}
          />
        </div>

        {/* Dropoff Time */}
        <div>
          <Label htmlFor="dropoffTime" className="text-sm font-medium text-gray-700 mb-2 block">
            {t('dropoffTime')}
          </Label>
          <TimePicker
            value={dropoffTime}
            onChange={(time) => onInputChange('dropoffTime', time)}
            className={`${textSize} font-medium`}
            placeholder={t('dropoffTime')}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile: Pickup Date and Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`pickupDate${suffix}`} className="text-sm pr-2 font-medium text-gray-700 mb-2 block">
            {t('pickupDate')}
          </Label>
          <Input
            type="date"
            id={`pickupDate${suffix}`}
            value={pickupDate}
            onChange={(e) => {
              const nextValue = e.target.value;
              onPickupDateChange(nextValue);
              requestAnimationFrame(() => e.target.blur());
            }}
            min={today} // Prevent selecting past dates
            required
            className={`${textSize} font-medium border-[#219f61] focus:border-[#1a7d4d] focus:ring-[#219f61]`}
          />
        </div>
        <div>
          <Label htmlFor={`pickupTime${suffix}`} className="text-sm pr-2 font-medium text-gray-700 mb-2 block">
            {t('pickupTime')}
          </Label>
          <TimePicker
            value={pickupTime}
            onChange={(time) => onInputChange('pickupTime', time)}
            className={`${textSize} font-medium`}
            placeholder={t('pickupTime')}
          />
        </div>
      </div>

      {/* Mobile: Dropoff Date and Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`dropoffDate${suffix}`} className="text-sm font-medium text-gray-700 mb-2 block">
            {t('dropoffDate')}
          </Label>
          <Input
            type="date"
            id={`dropoffDate${suffix}`}
            value={dropoffDate}
            onChange={(e) => {
              const nextValue = e.target.value;
              onInputChange('dropoffDate', nextValue);
              requestAnimationFrame(() => e.target.blur());
            }}
            min={getMinDropoffDate()} // Minimum dropoff date based on pickup date
            required
            className={`${textSize} font-medium border-[#219f61] focus:border-[#1a7d4d] focus:ring-[#219f61]`}
          />
        </div>
        <div>
          <Label htmlFor={`dropoffTime${suffix}`} className="text-sm font-medium text-gray-700 mb-2 block">
            {t('dropoffTime')}
          </Label>
          <TimePicker
            value={dropoffTime}
            onChange={(time) => onInputChange('dropoffTime', time)}
            className={`${textSize} font-medium`}
            placeholder={t('dropoffTime')}
          />
        </div>
      </div>
    </>
  );
};
