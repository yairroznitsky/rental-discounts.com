import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
  placeholder?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  className,
  placeholder = "Select time"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateDropdownPosition = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width + 20
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside both the container and any dropdown
      const target = event.target as Node;
      const isInsideContainer = containerRef.current?.contains(target);
      const isInsideDropdown = document.querySelector('.time-picker-dropdown')?.contains(target);
      
      if (!isInsideContainer && !isInsideDropdown) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, updateDropdownPosition]);

  // Generate time options with 30-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = useMemo(() => generateTimeOptions(), []);

  const formatTimeDisplay = (time: string) => {
    if (!time) return placeholder;
    const [hours, minutes] = time.split(':');
    const hour24 = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);

    if (hour24 === 0 && minute === 0) return '12:00 AM';
    if (hour24 === 12 && minute === 0) return '12:00 PM';

    const period = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 || 12;
    return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
  };

  const handleTimeSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
  };

  const handleOpen = () => {
    updateDropdownPosition();
    setIsOpen(true);
  };

  // Auto-scroll dropdown to current value or to noon (12:00) if no value
  useEffect(() => {
    if (!isOpen || !dropdownRef.current) return;

    // Prefer the selected value; otherwise default to noon
    const targetTime = value && timeOptions.includes(value) ? value : '12:00';

    // If the exact time is not in list (e.g., 12:15), find nearest 30-min slot
    let nearestTime = targetTime;
    if (!timeOptions.includes(targetTime)) {
      const [hStr, mStr] = targetTime.split(':');
      const h = Math.max(0, Math.min(23, parseInt(hStr || '0', 10)));
      const m = parseInt(mStr || '0', 10);
      const roundedMinutes = m < 15 ? 0 : m < 45 ? 30 : 0;
      const hourAdjusted = m >= 45 ? (h + 1) % 24 : h;
      nearestTime = `${String(hourAdjusted).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`;
    }

    const optionEl = dropdownRef.current.querySelector<HTMLDivElement>(`[data-time="${nearestTime}"]`);
    if (optionEl) {
      const container = dropdownRef.current;
      const targetTop = optionEl.offsetTop - container.clientHeight / 2 + optionEl.clientHeight / 2;
      container.scrollTop = Math.max(0, targetTop);
    }
  }, [isOpen, value]);

  return (
    <div ref={containerRef} className="relative">
      {/* Input field that looks like a regular input but is not editable */}
      <div
        onClick={handleOpen}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm",
          "border-amber-400 focus:border-amber-500 focus:ring-amber-500",
          className
        )}
      >
        <Clock className="mr-2 h-4 w-4 text-gray-500" />
        <span className={cn(
          "flex-1 text-left",
          !value && "text-muted-foreground"
        )}>
          {value ? formatTimeDisplay(value) : placeholder}
        </span>
      </div>

      {isOpen && createPortal(
        <div 
          ref={dropdownRef}
          className="time-picker-dropdown fixed z-[99999] bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width
          }}
        >
          {timeOptions.map((time) => (
            <div
              key={time}
              data-time={time}
              onClick={() => handleTimeSelect(time)}
              className={cn(
                "px-3 py-2 cursor-pointer hover:bg-gray-100",
                value === time && "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              <span className="flex-1 text-left">{formatTimeDisplay(time)}</span>
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};
