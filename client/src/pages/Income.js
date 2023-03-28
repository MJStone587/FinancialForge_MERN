import React, { useEffect, useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import IncomeDetails from '../components/IncomeDetails';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Income() {
  const { incData, dispatch } = useDataContext();
  const [incDisp, setIncDisp] = useState(5);
  const [incID, setIncID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dataLength, setDataLength] = useState();
  const [category, setCategory] = useState('');
  const [total, setTotal] = useState('');
  const [dateReceived, setDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [isMoreCompleted, setIsMoreCompleted] = useState(false);
  const [isLessCompleted, setIsLessCompleted] = useState(false);

  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch(
        'https://financialforge-mern.onrender.com/catalog/income'
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_DATA', payload: json });
      }
    };
    fetchIncome();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const income = {
      name,
      description,
      category,
      total,
      dateReceived,
    };
    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/income/create',
      {
        method: 'POST',
        body: JSON.stringify(income),
        headers: { 'Content-Type': 'application/json' },
      }
    );
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
      setError(null);
      setEmptyFields([]);
      setSuccess('Success: New income has been added!');
      dispatch({ type: 'CREATE_DATA', payload: json });
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const income = {
      name,
      description,
      category,
      total,
      dateReceived,
    };

    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/income/' + incID,
      {
        method: 'POST',
        body: JSON.stringify(income),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setSuccess('');
    } else if (response.ok) {
      setName('');
      setDescription('');
      setTotal('');
      setDate('');
      setError(null);
      setSuccess('Success: Income has been updated!');
      dispatch({ type: 'UPDATE_DATA', payload: json });
    }
  };

  useEffect(() => {
    if (dataLength) {
      if (incDisp <= 5) {
        setIsLessCompleted(true);
      } else if (incDisp >= 8) {
        setIsLessCompleted(false);
      }
      if (incDisp >= dataLength) {
        setIsMoreCompleted(true);
      } else if (incDisp < dataLength) {
        setIsMoreCompleted(false);
      }
    }
  }, [dataLength, incDisp]);

  useEffect(() => {
    if (incData) {
      setDataLength(incData.length);
    }
  }, [incData]);

  const loadMore = () => {
    if (incDisp < incData.length && incDisp >= 5) {
      setIncDisp(incDisp + 3);
    }
  };
  const loadLess = () => {
    if (incDisp >= 8) {
      setIncDisp(incDisp - 3);
    }
  };

  return (
    <div className="income-container">
      <div className="income-header">
        <h1>Income</h1>
        <p>Add, update, delete, and review your income.</p>
      </div>
      <section className="income-display">
        <div className="income-list">
          <h2 className="income-list-title">Income Receipts</h2>
          {incData &&
            incData
              .slice(0, incDisp)
              .map((income) => (
                <IncomeDetails
                  key={income._id}
                  name={income.name}
                  id={income._id}
                  dateReceived={income.dateReceived}
                  dateReceivedF={income.date_received_med}
                  category={income.category}
                  description={income.description}
                  dateCreated={income.dateCreated}
                  dateCreatedF={income.date_created_med}
                  total={income.total}
                  setIncID={setIncID}
                  setName={setName}
                  setTotal={setTotal}
                  setDescription={setDescription}
                  setCategory={setCategory}
                  setDate={setDate}
                />
              ))}
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
      </section>
    </div>
  );
}

export default Income;
