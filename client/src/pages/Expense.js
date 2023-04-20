import React from 'react';
import { useEffect, useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import { useAuthContext } from '../hooks/useAuthContext';
import ExpenseDetails from '../components/ExpenseDetails';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';

const Receipt = () => {
  const { expData, dispatch } = useDataContext();
  const { user } = useAuthContext();
  const [expID, setExpID] = useState('');
  const [name, setName] = useState('');
  const [expDisp, setExpDisp] = useState(5);
  const [dataLength, setDataLength] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [paymentType, setPaymentType] = useState('');
  const [isMoreCompleted, setIsMoreCompleted] = useState(false);
  const [isLessCompleted, setIsLessCompleted] = useState(false);
  const [total, setTotal] = useState('');
  const [category, setCategory] = useState('');
  const [dateReceived, setDateReceived] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  //INITIAL RETRIEVAL OF ALL DATA
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://financialforge-mern.onrender.com/catalog/expense',
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_EXPDATA', payload: json });
        setIsLoading(false);
      }
    };
    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  //Form Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Unathorized Access!');
      return;
    }
    // create expense object from input data
    const expense = {
      name,
      description,
      paymentType,
      dateReceived,
      total,
      category,
    };

    // wait for response from server
    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/expense/create',
      {
        method: 'POST',
        body: JSON.stringify(expense),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    // handle error and success
    if (!response.ok) {
      setError(json.error);
      setSuccess('');
      setEmptyFields(json.emptyFields);
    } else if (response.ok) {
      setName('');
      setDescription('');
      setTotal('');
      setDateReceived('');
      setCategory('');
      setPaymentType('');
      setError(null);
      setEmptyFields([]);
      setSuccess('Success: New expense has been added!');
      dispatch({ type: 'CREATE_EXPDATA', payload: json });
    }
  };

  // fetch all data method that requires call
  const fetchAgain = async () => {
    if (!user) {
      setError('Unauthorized Access!');
      return;
    }
    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/expense',
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'SET_EXPDATA', payload: json });
    }
  };
  //FORM UPDATE HANDLER
  const updateHandler = async (e) => {
    e.preventDefault();
    // expense object from input data
    if (!user) {
      setError('Unauthorized Access!');
      return;
    }
    const expense = {
      name,
      description,
      paymentType,
      dateReceived,
      total,
      category,
    };
    console.log(JSON.stringify(expense));
    // request for post to update single expense document
    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/expense/' + expID,
      {
        method: 'PUT',
        body: JSON.stringify(expense),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();
    // handle error and success
    if (!response.ok) {
      setError(json.error);
      setSuccess('');
    } else {
      setName('');
      setDescription('');
      setTotal('');
      setDateReceived('');
      setCategory('');
      setPaymentType('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'UPDATE_EXPDATA', payload: json });
      setSuccess('Success: Expense has been updated!');
    }
    if (user) {
      fetchAgain();
    }
  };
  // function to show more or less button
  useEffect(() => {
    //check for dataLength
    if (dataLength) {
      // check for data being displayed to show more or less buttons
      if (expDisp <= 5) {
        setIsLessCompleted(true);
      } else if (expDisp >= 8) {
        setIsLessCompleted(false);
      }
      if (expDisp >= dataLength) {
        setIsMoreCompleted(true);
      } else if (expDisp < dataLength) {
        setIsMoreCompleted(false);
      }
    }
  }, [dataLength, expDisp]);

  // waits for data to be loaded and then sets dataLength variable
  useEffect(() => {
    if (expData) {
      setDataLength(expData.length);
    }
  }, [expData]);

  // load more button function
  const loadMore = () => {
    if (expDisp < expData.length && expDisp >= 5) {
      setExpDisp(expDisp + 3);
    }
  };
  //load less button function
  const loadLess = () => {
    if (expDisp >= 8) {
      setExpDisp(expDisp - 3);
    }
  };

  return (
    <div className="expense-container">
      <div className="expense-header">
        <h1>Expenses</h1>
        <p>Add, update, delete, and review your income.</p>
      </div>
      <section className="expense-display">
        <div className="expense-list">
          <h2 className="expense-list-title">Expense Receipts</h2>
          <div className="expense-sort-container">
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
            expData &&
            expData
              .sort((a, b) => parseISO(b.dateCreated) - parseISO(a.dateCreated))
              .slice(0, expDisp)
              .map((data) => (
                <ExpenseDetails
                  key={data._id}
                  id={data._id}
                  name={data.name}
                  description={data.description}
                  category={data.category}
                  dateReceived={data.dateReceived}
                  dateReceivedF={data.date_received_med}
                  paymentType={data.paymentType}
                  total={data.total}
                  setName={setName}
                  setCategory={setCategory}
                  setError={setError}
                  setDateReceived={setDateReceived}
                  setDescription={setDescription}
                  setPaymentType={setPaymentType}
                  setTotal={setTotal}
                  setExpID={setExpID}
                />
              ))}
          {sortBy === 'total' &&
            expData &&
            expData
              .sort((a, b) => a.total - b.total)
              .slice(0, expDisp)
              .map((data) => (
                <ExpenseDetails
                  key={data._id}
                  id={data._id}
                  name={data.name}
                  description={data.description}
                  category={data.category}
                  dateReceived={data.dateReceived}
                  dateReceivedF={data.date_received_med}
                  paymentType={data.paymentType}
                  total={data.total}
                  setName={setName}
                  setCategory={setCategory}
                  setDateReceived={setDateReceived}
                  setDescription={setDescription}
                  setPaymentType={setPaymentType}
                  setTotal={setTotal}
                  setExpID={setExpID}
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
        <aside className="expense-form-container">
          <div className="expense-form-header">
            <h2>+ Create New Expense</h2>
          </div>
          <form className="expense-form">
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
            <label htmlFor="expense-category">Category:</label>
            <select
              id="expense-category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className={emptyFields.includes('category') ? 'error' : ''}
            >
              <option value="" defaultValue></option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="House">House</option>
              <option value="Car">Car</option>
              <option value="Work">Work</option>
              <option value="Clothing">Clothing</option>
              <option value="Pet">Pet</option>
              <option value="Self-Care">Self-Care</option>
              <option value="Other">Other</option>
            </select>
            <label htmlFor="expense-type">Payment Type:</label>
            <select
              id="expense-type"
              onChange={(e) => setPaymentType(e.target.value)}
              value={paymentType}
              className={emptyFields.includes('paymentType') ? 'error' : ''}
            >
              <option value="" defaultValue></option>
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
              <option value="Cash">Cash</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Check">Check</option>
              <option value="Other">Other</option>
            </select>
            <label>Total: </label>
            <input
              id="expense-description"
              type="number"
              onChange={(e) => setTotal(e.target.value)}
              value={total}
              className={emptyFields.includes('total') ? 'error' : ''}
            />
            <label>Date:</label>
            <DatePicker
              onChange={(date) => setDateReceived(date)}
              value={dateReceived}
              selected={dateReceived}
              className={emptyFields.includes('dateReceived') ? 'error' : ''}
            />
            <button onClick={submitHandler}>Add New Expense</button>
            <button onClick={updateHandler}>Update Existing Expense</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </aside>
      </section>
    </div>
  );
};

export default Receipt;
