import { useState } from 'react';
import { useAuthContext } from './useAuthContext.js';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/catalog/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccess(null);
      setEmptyFields(json.emptyFields);
    } else if (response.ok) {
      setError(null);
      setSuccess(json.success);
      setEmptyFields([]);
      localStorage.setItem(
        'user',
        JSON.stringify({ token: json.token, email: json.email })
      );
      dispatch({ type: 'LOGIN', payload: json });
    }
  };
  return { login, error, success, emptyFields };
};
