import { useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';

const Incomeform = () => {
  const { dispatch } = useDataContext();
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

  return (
    <section className="income_form_container">
      <form className="income_form" onSubmit={submitHandler}>
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
        <input
          id="income_date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          className={emptyFields.includes('date') ? 'error' : ''}
        />
        <button>Add Income</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </form>
    </section>
  );
};

export default Incomeform;
