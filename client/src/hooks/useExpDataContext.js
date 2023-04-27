import { ExpDataContext } from '../context/ExpDataContext';
import { useContext } from 'react';

export const useExpDataContext = () => {
  const context = useContext(ExpDataContext);

  if (!context) {
    throw Error('useExpDataContext must be used inside an DataContextProvider');
  }
  return context;
};
