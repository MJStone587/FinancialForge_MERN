import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from '../hooks/useDataContext';

function Income() {
  const { data, dispatch } = useDataContext();

  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch('/catalog/income');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_DATA', payload: json });
      }
    };

    fetchIncome();
  }, []);
  /*
  const handleDelete = async () => {
    const response = await fetch('/catalog/income/' + income._id, {
      method: 'DELETE',
    });
    const json = await response.json();
  };
*/

  return (
    <section className="income_container">
      <h1>Income Page</h1>
      <table className="income_table">
        <thead className="income_thead">
          <tr className="income_row_head">
            <th id="income_th_name">Name</th>
            <th id="income_th_from">From</th>
            <th id="income_th_date">Date</th>
            <th id="income_th_amount">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data) => (
              <tr className="income_body_tr" key={data._id}>
                <td className="income_name_td">{data.name}</td>
                <td className="income_from_td">{data.from}</td>
                <td className="income_date_td">{data.date}</td>
                <td className="income_amt_td">${data.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Link to="/income/create">
        <h2 id="income_add_income">Add Income</h2>
      </Link>
    </section>
  );
}

export default Income;
