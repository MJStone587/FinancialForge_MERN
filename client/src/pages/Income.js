import React, { useEffect, useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import IncomeDetails from '../components/IncomeDetails';
import DatePicker from 'react-datepicker';

function Income() {
  const { data, dispatch } = useDataContext();
  const [incDisp, setIncDisp] = useState(5);
  const [incID, setIncID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const income = { name, description, from, amount, date };
    const response = await fetch('/catalog/income/create', {
      method: 'POST',
      body: JSON.stringify(income),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setSuccess('');
      setEmptyFields(json.emptyFields);
    } else if (response.ok) {
      setName('');
      setDescription('');
      setAmount('');
      setDate('');
      setError(null);
      setEmptyFields([]);
      setSuccess('Success: New income has been added!');
      dispatch({ type: 'CREATE_DATA', payload: json });
    }
  };

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

  const updateHandler = async () => {
    const income = { name, description, from, amount, date };
    const response = await fetch('/catalog/income/' + incID, {
      method: 'POST',
      body: JSON.stringify(income),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setSuccess('');
      setEmptyFields(json.emptyFields);
    } else if (response.ok) {
      setName('');
      setDescription('');
      setAmount('');
      setDate('');
      setError(null);
      setEmptyFields([]);
      setSuccess('Success: Income has been updated!');
      dispatch({ type: 'UPDATE_DATA', payload: json });
    }
  };
  // COME BACK TO SHOW MORE AND LESS, MAKE BETTER OONGA BOONGA
  const showMore = () => {
    if (incDisp !== data.length) {
      setIncDisp(incDisp + 3);
    }
  };
  const showLess = () => {
    if (incDisp > 3) {
      setIncDisp(incDisp - 3);
    }
  };

  return (
    <div className="income_container">
      <section className="income_display">
        <div className="income_header">
          <h1>Income</h1>
          <p>Add, update, delete, and review your income.</p>
        </div>

        <div className="income_list">
          {data &&
            data
              .slice(0, incDisp)
              .map((income) => (
                <IncomeDetails
                  key={income._id}
                  name={income.name}
                  id={income._id}
                  date={income.date}
                  dateF={income.date_form}
                  from={income.from}
                  description={income.description}
                  amount={income.amount}
                  setIncID={setIncID}
                  setName={setName}
                  setAmount={setAmount}
                  setDescription={setDescription}
                  setFrom={setFrom}
                  setDate={setDate}
                />
              ))}
          <button onClick={showMore}>Show More</button>
          <button onClick={showLess}>Show Less</button>
        </div>
      </section>
      <aside className="income_form_container">
        <div className="income_form_header">
          <h2>+ Add New Income</h2>
        </div>
        <form className="income_form">
          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes('name') ? 'error' : ''}
          />
          <label>Description:</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes('description') ? 'error' : ''}
          />
          <label htmlFor="income_from">From:</label>
          <select
            name="income_from"
            id="income_from"
            onChange={(e) => setFrom(e.target.value)}
            value={from}
            className={emptyFields.includes('from') ? 'error' : ''}
          >
            <option value="" defaultValue></option>
            <option value="Job">Job</option>
            <option value="Gift">Gift</option>
            <option value="Investment">Investment</option>
            <option value="Savings">Savings</option>
            <option value="Other">Other</option>
          </select>
          <label>Amount: </label>
          <input
            id="income_description"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            className={emptyFields.includes('amount') ? 'error' : ''}
          />
          <label>Date:</label>
          <DatePicker
            id="income_date"
            onChange={(date) => setDate(date)}
            value={date}
            className={emptyFields.includes('date') ? 'error' : ''}
          />
          <button onClick={submitHandler}>Add NEW Income</button>
          <button onClick={updateHandler}>Update Income</button>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </form>
      </aside>
    </div>
  );
}

export default Income;
