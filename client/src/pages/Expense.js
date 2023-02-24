import React from 'react';
import { useEffect } from 'react';
import { useDataContext } from '../hooks/useDataContext';

const Receipt = () => {
  const { data, dispatch } = useDataContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/catalog/receipt');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_DATA', payload: json });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <table className="exp_table">
        <thead className="exp_thead">
          <tr className="exp_row_head">
            <th id="exp_th_name">Name</th>
            <th id="exp_th_from">Category</th>
            <th id="exp_th_date">Payment Type</th>
            <th id="exp_th_amount">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data) => (
              <tr className="exp_body_tr" key={data._id}>
                <td className="exp_name_td">{data.name}</td>
                <td className="exp_from_td">{data.category}</td>
                <td className="exp_date_td">{data.ccName}</td>
                <td className="exp_amt_td">${data.total}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Receipt;
