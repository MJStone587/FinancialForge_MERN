import React, { useEffect, useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import IncomeDetails from '../components/IncomeDetails';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

function Income() {
  const { data, dispatch } = useDataContext();
  const [incDisp, setIncDisp] = useState(5);
  const [incID, setIncID] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
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

  //initial request to server to receive all income data
  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch(
        'https://financialforge-mern.onrender.com/catalog/income'
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_INCDATA', payload: json });
        setIsLoading(false);
      }
    };
    fetchIncome();
  }, [dispatch]);

  // Another fetch to get data that must be called
  const fetchAgain = async () => {
    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/income'
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'SET_INCDATA', payload: json });
    }
  };

  //form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();
    // create income object from input data
    const income = {
      name,
      description,
      category,
      total,
      dateReceived,
    };
    //post request to server with income object
    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/income/create',
      {
        method: 'POST',
        body: JSON.stringify(income),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const json = await response.json();

    // handle error or success
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
      dispatch({ type: 'CREATE_INCDATA', payload: json });
    }
  };

  // update button handler
  const updateHandler = async (e) => {
    e.preventDefault();
    // create income object from input fields
    const income = {
      name,
      description,
      category,
      total,
      dateReceived,
    };

    // create post request to server for specific income id
    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/income/' + incID,
      {
        method: 'POST',
        body: JSON.stringify(income),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const json = await response.json();
    // handle errors and success
    if (!response.ok) {
      setError(json.error);
      setSuccess('');
    } else if (response.ok) {
      setName('');
      setDescription('');
      setTotal('');
      setDate('');
      setError(null);
      dispatch({ type: 'UPDATE_INCDATA', payload: json });
      setSuccess('Success: Income has been updated!');
    }
    // call fetchAgain method to update income display and state
    fetchAgain();
  };

  // function to display a Show More or Show Less button
  useEffect(() => {
    // check for dataLength
    if (dataLength) {
      // based on dataLength and income data displayed show more or less button
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

  // if Data is loaded set dataLength variable
  useEffect(() => {
    if (data) {
      setDataLength(data.length);
    }
  }, [data]);

  //load more button function
  const loadMore = () => {
    if (incDisp < data.length && incDisp >= 5) {
      setIncDisp(incDisp + 3);
    }
  };

  // load less button function
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
          <div className="income-sort-container">
            <p>Sort:</p>
            <button onClick={() => setSortBy('total')}>Total</button>
            <button onClick={() => setSortBy('default')}>Date</button>
          </div>
          {isLoading ? (
            <p className="server-loading">
              Server just woke up, data will load in a moment. Please be patient
              he had a late night.
            </p>
          ) : (
            ''
          )}
          {sortBy === 'default' &&
            data &&
            data
              .sort((a, b) => parseISO(b.dateCreated) - parseISO(a.dateCreated))
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
          {sortBy === 'total' &&
            data &&
            data
              .sort((a, b) => a.total - b.total)
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
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </aside>
      </section>
    </div>
  );
}

export default Income;
