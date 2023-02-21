import React from 'react';

function IncomeDetails({ income }) {
  return (
    <div>
      <h1>Income Details</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>From</th>
        </tr>
        <tr key={income._id}>
          <td>{income.name}</td>
          <td>{income.description}</td>
          <td>{income.from}</td>
        </tr>
      </table>
    </div>
  );
}

export default IncomeDetails;
