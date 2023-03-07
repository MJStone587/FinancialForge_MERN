import React from 'react';
import { useEffect, useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import ExpenseDetails from '../components/ExpenseDetails';

const Receipt = () => {
  const { data, dispatch } = useDataContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [total, setTotal] = useState('');
  const [ccName, setCCName] = useState('None');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const income = {
      name,
      description,
      paymentType,
      ccName,
      date,
      total,
      category,
    };
    const response = await fetch('/catalog/expense/create', {
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
      setCCName('');
      setCategory('');
      setPaymentType('');
      setError(null);
      setEmptyFields([]);
      setSuccess('Success: New income has been added!');
      dispatch({ type: 'CREATE_DATA', payload: json });
    }
  };

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

  return (
    <div className="expense_container">
      <section className="expense_display">
        <div className="expense_display_header">
          <h2>Expenses</h2>
        </div>
        {data &&
          data.map((data) => (
            <ExpenseDetails
              key={data._id}
              id={data._id}
              name={data.name}
              category={data.category}
              date={data.date_formatted}
              total={data.total}
              ccName={data.ccName}
            />
          ))}
      </section>
      <aside className="expense_form_container">
        <div className="expense_form_header">
          <h2>+ Create New Expense</h2>
        </div>
        <form className="expense_form" onSubmit={submitHandler}>
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
          <label htmlFor="expense_category">Category:</label>
          <select
            name="expense_category"
            id="expense_category"
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
          <label htmlFor="expense_type">Payment Type:</label>
          <select
            name="expense_type"
            id="expense_type"
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
          <label htmlFor="expense_ccName">Credit Card (If Applicable):</label>
          <select
            name="expense_ccName"
            id="expense_ccName"
            onChange={(e) => setCCName(e.target.value)}
            value={ccName}
            className="ccName"
          >
            <option value="" defaultValue></option>
            <option value="Discover">Discover</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="Amex">Amex</option>
          </select>
          <label>Amount: </label>
          <input
            id="expense_description"
            type="number"
            onChange={(e) => setTotal(e.target.value)}
            value={total}
            className={emptyFields.includes('total') ? 'error' : ''}
          />
          <label>Date:</label>
          <input
            id="expense_date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            className={emptyFields.includes('date') ? 'error' : ''}
          />
          <button>Add Income</button>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </form>
      </aside>
    </div>
  );
};

export default Receipt;
