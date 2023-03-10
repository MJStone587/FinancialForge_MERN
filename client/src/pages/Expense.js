import React from 'react';
import { useEffect, useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import ExpenseDetails from '../components/ExpenseDetails';
import DatePicker from 'react-datepicker';

const Receipt = () => {
  const { data, dispatch } = useDataContext();
  const [expID, setExpID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [total, setTotal] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
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
      date,
      total,
      category,
    };
    const response = await fetch('/catalog/expense/create', {
      method: 'POST',
      body: JSON.stringify(expense),
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
      setCategory('');
      setPaymentType('');
      setError(null);
      setEmptyFields([]);
      setSuccess('Success: New expense has been added!');
      dispatch({ type: 'CREATE_DATA', payload: json });
    }
  };

  //RETRIEVE ALL DATA
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/catalog/expense');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_DATA', payload: json });
      }
    };

    fetchData();
  }, []);

  //FORM UPDATE HANDLER
  const updateHandler = async () => {
    const expense = {
      name,
      description,
      paymentType,
      date,
      total,
      category,
    };

    const response = await fetch('/catalog/expense/' + expID, {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccess('');
    } else {
      setName('');
      setDescription('');
      setTotal('');
      setDate('');
      setCategory('');
      setPaymentType('');
      setError(null);
      setEmptyFields([]);
      setSuccess('Success: Expense has been updated!');
      dispatch({ type: 'UPDATE_DATA', payload: json });
    }
  };

  return (
    <div className="expense-container">
      <section className="expense-display">
        <div className="expense-display-header">
          <h2>Expenses</h2>
        </div>
        {data &&
          data.map((data) => (
            <ExpenseDetails
              key={data._id}
              id={data._id}
              name={data.name}
              description={data.description}
              category={data.category}
              date={data.date}
              dateF={data.date_form_med}
              paymentType={data.paymentType}
              total={data.total}
              setName={setName}
              setCategory={setCategory}
              setDate={setDate}
              setDescription={setDescription}
              setPaymentType={setPaymentType}
              setTotal={setTotal}
              setExpID={setExpID}
            />
          ))}
      </section>
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
          <label>Amount: </label>
          <input
            id="expense-description"
            type="number"
            onChange={(e) => setTotal(e.target.value)}
            value={total}
            className={emptyFields.includes('total') ? 'error' : ''}
          />
          <label>Date:</label>
          <DatePicker
            onChange={(date) => setDate(date)}
            value={date}
            className={emptyFields.includes('date') ? 'error' : ''}
          />
          <button onClick={submitHandler}>Add New Expense</button>
          <button onClick={updateHandler}>Update Existing Expense</button>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </form>
      </aside>
    </div>
  );
};

export default Receipt;
