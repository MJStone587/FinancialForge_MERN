import { useContext } from 'react';

export const useReceiptContext = () => {
  const context = useContext(ReceiptContext);

  if (!context) {
    throw Error(
      'useReceiptContext must be used inside an ReceiptContextProvider'
    );
  }
  return context;
};
