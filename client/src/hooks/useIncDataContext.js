import { IncDataContext } from '../context/IncDataContext';
import { useContext } from 'react';

export const useIncDataContext = () => {
  const context = useContext(IncDataContext);

  if (!context) {
    throw Error('useIncDataContext must be used inside an DataContextProvider');
  }
  return context;
};
