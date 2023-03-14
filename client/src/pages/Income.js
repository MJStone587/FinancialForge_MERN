import React, { useEffect, useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import IncomeDetails from '../components/IncomeDetails';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Income() {
  const { data, dispatch } = useDataContext();
  const [incDisp, setIncDisp] = useState(5);
  const [incID, setIncID] = useState('');
  const [name, setName] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [total, setTotal] = useState('');
  const [dateReceived, setDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [isMoreCompleted, setIsMoreCompleted] = useState(false);
  const [isLessCompleted, setIsLessCompleted] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setDateCreated(Date.now());
    const income = {
      name,
      description,
      category,
      total,
      dateReceived,
      dateCreated,
    };
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
      setTotal('');
      setDate('');
      setDateCreated('');
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
    const income = {
      name,
      description,
      category,
      total,
      dateReceived,
      dateCreated,
    };

    const response = await fetch('/catalog/income/' + incID, {
      method: 'POST',
      body: JSON.stringify(income),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setSuccess('');
    } else if (response.ok) {
      setName('');
      setDescription('');
      setTotal('');
      setDate('');
      setDateCreated('');
      setError(null);
      setSuccess('Success: Income has been updated!');
      dispatch({ type: 'UPDATE_DATA', payload: json });
    }
  };
  // COME BACK TO SHOW MORE AND LESS, MAKE BETTER OONGA BOONGA
  const loadMore = () => {
    if (incDisp >= data.length) {
      setIsMoreCompleted(true);
    }
    if (incDisp <= data.length) {
      setIsMoreCompleted(false);
    }
    setIncDisp(incDisp + 3);
  };
  const loadLess = () => {
    if (incDisp <= 5) {
      setIsLessCompleted(true);
    }
    if (incDisp >= 8) {
      setIsLessCompleted(false);
    }
    setIncDisp(incDisp - 3);
  };
  return (
    <div className="income-container">
      <section className="income-display">
        <div className="income-header">
          <h1>Income</h1>
          <p>Add, update, delete, and review your income.</p>
        </div>

        <div className="income-list">
          {data &&
            data
              .slice(0, incDisp)
              .map((income) => (
                <IncomeDetails
                  key={income._id}
                  name={income.name}
                  id={income._id}
                  dateReceived={income.dateReceived}
                  dateF={income.date_rec_month}
                  category={income.category}
                  description={income.description}
                  dateCreated={income.dateCreated}
                  dateCreatedF={income.date_cre_formatted}
                  total={income.total}
                  setIncID={setIncID}
                  setName={setName}
                  setTotal={setTotal}
                  setDescription={setDescription}
                  setCategory={setCategory}
                  setDate={setDate}
                  setDateCreated={setDateCreated}
                />
              ))}
        </div>
        <div className="btn-container">
          {isMoreCompleted ? (
            <button
              onClick={loadMore}
              type="button"
              className="btn btn-loadmore disabled"
            >
              That's It
            </button>
          ) : (
            <button
              onClick={loadMore}
              type="button"
              className="btn btn-loadmore"
            >
              Load More
            </button>
          )}
          {isLessCompleted ? (
            <button
              onClick={loadLess}
              type="button"
              className="btn btn-loadless disabled"
            >
              That's It
            </button>
          ) : (
            <button
              onClick={loadLess}
              type="button"
              className="btn btn-loadless"
            >
              Load Less
            </button>
          )}
        </div>
      </section>
      <aside className="income-form-container">
        <div className="income-form-header">
          <h2>+ Add New Income</h2>
        </div>
        <form className="income-form">
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
          <label htmlFor="income-category">Category:</label>
          <select
            name="income-category"
            id="income-category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className={emptyFields.includes('category') ? 'error' : ''}
          >
            <option value="" defaultValue></option>
            <option value="Job">Job</option>
            <option value="Gift">Gift</option>
            <option value="Investment">Investment</option>
            <option value="Savings">Savings</option>
            <option value="Other">Other</option>
          </select>
          <label>Total: </label>
          <input
            id="income-description"
            type="number"
            onChange={(e) => setTotal(e.target.value)}
            value={total}
            className={emptyFields.includes('total') ? 'error' : ''}
          />
          <label>Date:</label>
          <DatePicker
            onChange={(date) => setDate(date)}
            value={dateReceived}
            selected={dateReceived}
            className={emptyFields.includes('date') ? 'error' : 'date'}
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
