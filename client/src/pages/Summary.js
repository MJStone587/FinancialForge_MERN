import { useEffect, useState } from 'react';

function Summary() {
  const [receipt, setReceipt] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/catalog/summary');
      const json = await response.json();
      if (response.ok) {
        setReceipt(json);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="summary_container">
      <h1>Summary</h1>
      <h3>Review all financial records</h3>
      <table>
        {receipt &&
          receipt.map((rec) => (
            <tr key={rec._id}>
              <td>{rec.name}</td>
              <td>{rec.amount}</td>
            </tr>
          ))}
      </table>
    </section>
  );
}

export default Summary;
