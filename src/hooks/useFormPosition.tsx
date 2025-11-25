import React, { createContext, useContext, useState, useEffect } from 'react';

interface FormPositionContextType {
  isFormPushedUp: boolean;
  setIsFormPushedUp: (pushed: boolean) => void;
}

const FormPositionContext = createContext<FormPositionContextType | undefined>(undefined);

export const FormPositionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFormPushedUp, setIsFormPushedUp] = useState(false);

  return (
    <FormPositionContext.Provider value={{ isFormPushedUp, setIsFormPushedUp }}>
      {children}
    </FormPositionContext.Provider>
  );
};

export const useFormPosition = () => {
  const context = useContext(FormPositionContext);
  if (context === undefined) {
    throw new Error('useFormPosition must be used within a FormPositionProvider');
  }
  return context;
}; 