import React, { useEffect, useState } from 'react';
import { useIncDataContext } from '../hooks/useIncDataContext';
import { useAuthContext } from '../hooks/useAuthContext';
import IncomeDetails from '../components/IncomeDetails';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

function Income() {
  const { data, dispatch } = useIncDataContext();
  const { user } = useAuthContext();
  const [incDisp, setIncDisp] = useState(5);
  const [incID, setIncID] = useState('');
  const [name, setName] = useState('');
  const [updated, setUpdated] = useState(false);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [total, setTotal] = useState('');
  const [dateReceived, setDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [isMoreCompleted, setIsMoreCompleted] = useState(false);
  const [isLessCompleted, setIsLessCompleted] = useState(false);

  //FIX ROUTES TO https://financialforge-mern.onrender.com BEFORE GOING LIVE

  //initial request to server to receive all income data
  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch(
        'https://financialforge-mern.onrender.com/catalog/income',
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_DATA', payload: json });
        setIsLoading(false);
      }
    };
    if (user) {
      fetchIncome();
    }
  }, [dispatch, user]);

  //form submission handler
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Unathorized Access!');
      return;
    }
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
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
      setCategory('');
      setTotal('');
      setDate('');
      setError(null);
      setEmptyFields([]);
      setSuccess('Success: New income has been added!');
      dispatch({ type: 'CREATE_DATA', payload: json });
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
        method: 'PUT',
        body: JSON.stringify(income),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
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
      setCategory('');
      setDate('');
      setError(null);
      setSuccess('Success: Income has been updated!');
      setUpdated(true);
      setShowUpdateBtn(false);
    }
  };

  // function to display a Show More or Show Less button
  useEffect(() => {
    // check for data loaded before proceeding
    if (data) {
      if (incDisp <= 5) {
        setIsLessCompleted(true);
      } else if (incDisp >= 8) {
        setIsLessCompleted(false);
      }
      if (incDisp >= data.length) {
        setIsMoreCompleted(true);
      } else if (incDisp < data.length) {
        setIsMoreCompleted(false);
      }
    }
  }, [data, incDisp]);

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

  const clearBtn = (e) => {
    e.preventDefault();
    setName('');
    setDescription('');
    setCategory('');
    setTotal('');
    setDate('');
    setShowUpdateBtn(false);
    setError(null);
    setSuccess(null);
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
            <button
              className="sortBtn sortTotal"
              onClick={() => setSortBy('total')}
            >
              Total
            </button>
            <button
              className="sortBtn sortDate"
              onClick={() => setSortBy('default')}
            >
              Date
            </button>
          </div>
          {isLoading ? (
            <span className="material-symbols-outlined server-loading">
              pending
            </span>
          ) : (
            ''
          )}
          {sortBy === 'default' &&
            data &&
            data
              .sort((a, b) => parseISO(b.dateCreated) - parseISO(a.dateCreated))
              .slice(0, incDisp)
              .map((income, dex) => (
                <IncomeDetails
                  key={dex}
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
                  updated={updated}
                  setUpdated={setUpdated}
                  setShowUpdateBtn={setShowUpdateBtn}
                  setName={setName}
                  setTotal={setTotal}
                  setError={setError}
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
                  updated={updated}
                  setUpdated={setUpdated}
                  setShowUpdateBtn={setShowUpdateBtn}
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
              + Load More +
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
              - Load Less -
            </button>
          )}
        </div>
        <aside className="income-form-container">
          <div className="income-form-header">
            <h2>+ Add New Income</h2>
          </div>
          <form className="income-form">
            <label>Title:</label>
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
            <button
              onClick={submitHandler}
              className={showUpdateBtn ? 'createBtn disabled' : 'createBtn'}
            >
              Add NEW Income
            </button>
            <button
              onClick={updateHandler}
              className={showUpdateBtn ? 'updateBtn' : 'updateBtn disabled'}
            >
              Update Income
            </button>
            <button
              onClick={clearBtn}
              className={showUpdateBtn ? 'clearBtn' : 'clearBtn disabled'}
            >
              Clear
            </button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </aside>
      </section>
    </div>
  );
}

export default Income;
