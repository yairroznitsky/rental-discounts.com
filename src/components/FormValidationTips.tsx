import React from 'react';
import { AlertCircle, Info, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidationTip {
  id: string;
  type: 'info' | 'warning' | 'success';
  message: string;
  icon?: React.ReactNode;
}

interface FormValidationTipsProps {
  tips: ValidationTip[];
  className?: string;
}

export const FormValidationTips: React.FC<FormValidationTipsProps> = ({
  tips,
  className
}) => {
  if (!tips.length) return null;

  const getIcon = (type: ValidationTip['type']) => {
    switch (type) {
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: ValidationTip['type']) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {tips.map((tip) => (
        <div
          key={tip.id}
          className={cn(
            "flex items-start gap-3 p-3 rounded-lg border",
            getBackgroundColor(tip.type)
          )}
        >
          {tip.icon || getIcon(tip.type)}
          <p className="text-sm font-medium">{tip.message}</p>
        </div>
      ))}
    </div>
  );
}; 