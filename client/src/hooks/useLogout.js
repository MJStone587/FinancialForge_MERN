import { useAuthContext } from './useAuthContext.js';
import { useIncDataContext } from './useIncDataContext.js';
import { useExpDataContext } from './useExpDataContext.js';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchIncData } = useIncDataContext();
  const { dispatch: dispatchExpData } = useExpDataContext();

  const logout = () => {
    //remove user from storage
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    dispatchIncData({ type: 'SET_DATA' });
    dispatchExpData({ type: 'SET_DATA' });
  };
  return { logout };
};
