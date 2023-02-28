import React, { useEffect } from 'react';
import { useDataContext } from '../hooks/useDataContext';

function SingleIncome() {
  const { data, dispatch } = useDataContext();

  useEffect(() => {
    const fetchData = async function () {
      const response = await fetch('/catalog/income/');
      const json = response.json();
      if (response.ok) {
        dispatch({ type: 'SET_DATA', payload: json });
      } else {
        console.log('Error data not found');
      }
    };
    fetchData();
  }, []);

  return <div>{data && data.map((income) => <p>{income.date}</p>)}</div>;
}

export default SingleIncome;
