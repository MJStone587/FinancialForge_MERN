import React from 'react';
import { useEffect, useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import ExpenseDetails from '../components/ExpenseDetails';
import DatePicker from 'react-datepicker';

const Receipt = () => {
  const { expData, dispatch } = useDataContext();
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

  //Form Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    const expense = {
      name,
      description,
      paymentType,
      dateReceived,
      total,
      category,
    };
    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/expense/create',
      {
        method: 'POST',
        body: JSON.stringify(expense),
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
      setDateReceived('');
      setCategory('');
      setPaymentType('');
      setError(null);
      setEmptyFields([]);
      setSuccess('Success: New expense has been added!');
      dispatch({ type: 'CREATE_EXPDATA', payload: json });
    }
  };

  //INITIAL RETRIEVE ALL DATA
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://financialforge-mern.onrender.com/catalog/expense'
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_EXPDATA', payload: json });
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const fetchAgain = async () => {
    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/expense'
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'SET_EXPDATA', payload: json });
    }
  };
  //FORM UPDATE HANDLER
  const updateHandler = async (e) => {
    e.preventDefault();
    const expense = {
      name,
      description,
      paymentType,
      dateReceived,
      total,
      category,
    };

    const response = await fetch(
      'https://financialforge-mern.onrender.com/catalog/expense/' + expID,
      {
        method: 'POST',
        body: JSON.stringify(expense),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const json = await response.json();

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
    fetchAgain();
  };
  // A data check to display less or more button based
  // on how many expense cards are being displayed
  useEffect(() => {
    if (dataLength) {
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
  // so that my previous useEffect will only happen once data is loaded
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
          <div>
            <button onClick={() => setSortBy('total')}>Total</button>
            <button onClick={() => setSortBy('title')}>Title</button>
            <button onClick={() => setSortBy('default')}>Date</button>
          </div>
          {isLoading ? (
            <p>
              Server just woke up, data will load in a moment. Please be patient
              he had a late night.
            </p>
          ) : (
            ''
          )}
          {expData &&
            sortBy === 'default' &&
            expData
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
          {expData &&
            sortBy === 'total' &&
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
          {expData &&
            sortBy === 'title' &&
            expData
              .sort()
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
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
          </form>
        </aside>
      </section>
    </div>
  );
};

export default Receipt;
