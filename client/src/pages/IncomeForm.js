import { useState } from 'react';

const Incomeform = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState('');

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
      setErr(json.error);
      setSuccess('');
    } else if (response.ok) {
      setName('');
      setDescription('');
      setAmount('');
      setDate('');
      setErr(null);
      setSuccess('Success: New income has been added!');
      console.log(json);
    }
  };

  return (
    <form className="income_form" onSubmit={submitHandler}>
      <label>Name:</label>
      <input
        id="income_name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label>Description:</label>
      <input
        id="income_description"
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <label htmlFor="income_from">From:</label>
      <select
        name="income_from"
        id="income_from"
        onChange={(e) => setFrom(e.target.value)}
        value={from}
      >
        <option value="" defaultValue></option>
        <option value="Job">Job</option>
        <option value="Gift">Gift</option>
        <option value="Investment">Investment</option>
        <option value="Savings">Savings</option>
        <option value="Other">Other</option>
      </select>
      <label>Amount: $</label>
      <input
        id="income_description"
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />
      <label>Date:</label>
      <input
        id="income_date"
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      <button>Add Income</button>
      {err && <p>{err}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default Incomeform;
